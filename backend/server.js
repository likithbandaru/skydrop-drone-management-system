const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const oracledb = require('oracledb');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function getConnection() {
  return oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
  });
}

app.get('/api/health', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute('SELECT 1 FROM dual');
    res.json({ ok: true, message: 'SkyDrop backend connected to Oracle' });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/api/customers', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT customer_id, name, email, phone, default_lat, default_long, created_at
       FROM CUSTOMER ORDER BY customer_id`
    );
    res.json(result.rows.map(row => ({
      customer_id: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      default_lat: row[4],
      default_long: row[5],
      created_at: row[6]
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/api/customers', async (req, res) => {
  const { name, email, phone, default_lat, default_long, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Name, email and password are required'
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await connection.execute(
      `SELECT customer_id FROM CUSTOMER
       WHERE LOWER(TRIM(email)) = :email`,
      { email: normalizedEmail }
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        error: 'An account with this email already exists'
      });
    }

    const result = await connection.execute(
      `INSERT INTO CUSTOMER
       (customer_id, name, email, phone, default_lat,
        default_long, password_value)
       VALUES
       (customer_seq.NEXTVAL, :name, :email, :phone,
        :default_lat, :default_long, :password)
       RETURNING customer_id INTO :customer_id`,
      {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone || null,
        default_lat: default_lat ?? null,
        default_long: default_long ?? null,
        password,
        customer_id: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        }
      },
      { autoCommit: true }
    );

    const customerId = result.outBinds.customer_id[0];

    res.status(201).json({
      customer: {
        customer_id: customerId,
        id: `CUST-${customerId}`,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone || null,
        default_lat: default_lat ?? null,
        default_long: default_long ?? null,
        role: 'customer'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/api/customers/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT customer_id, name, email, phone,
              default_lat, default_long
       FROM CUSTOMER
       WHERE LOWER(TRIM(email)) = :email
         AND password_value = :password`,
      {
        email: email.trim().toLowerCase(),
        password
      }
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const row = result.rows[0];

    res.json({
      customer: {
        customer_id: row[0],
        id: `CUST-${row[0]}`,
        name: row[1],
        email: row[2],
        phone: row[3],
        default_lat: row[4],
        default_long: row[5],
        role: 'customer'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/api/orders', async (req, res) => {
  const {
    customer_id: rawCustomerId,
    pickup_label,
    drone_id,
    order_time,
    total_weight_kg,
    delivery_status,
    destination_lat,
    destination_lng
  } = req.body;

  const customer_id =
    typeof rawCustomerId === 'string' && rawCustomerId.startsWith('CUST-')
      ? Number(rawCustomerId.replace('CUST-', ''))
      : Number(rawCustomerId);

  if (!Number.isInteger(customer_id)) {
    return res.status(400).json({
      error: 'Invalid customer ID'
    });
  }

  if (!pickup_label || !total_weight_kg) {
    return res.status(400).json({
      error: 'Pickup hub and weight are required'
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const customerResult = await connection.execute(
      `SELECT customer_id
       FROM CUSTOMER
       WHERE customer_id = :customer_id`,
      { customer_id }
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Customer not found'
      });
    }

    const hubMap = {
      'Central Metro Hub': 201,
      'Northside Medical Hub': 202,
      'Guindy Industrial Hub': 203,
      'OMR Cyber Tech Hub': 204
    };

    const hubId = hubMap[pickup_label];

    if (!hubId) {
      return res.status(404).json({
        error: 'Pickup hub not found'
      });
    }

    const droneMap = {
      'SD-D204': 301,
      'SD-VIP-042': 307
    };

    const droneId = drone_id ? droneMap[drone_id] : null;

    if (drone_id && !droneId) {
      return res.status(404).json({
        error: 'Drone not found'
      });
    }

    const orderIdResult = await connection.execute(
      `SELECT NVL(MAX(order_id), 1000) + 1
       FROM DELIVERY_ORDER`
    );

    const orderId = orderIdResult.rows[0][0];

    await connection.execute(
      `INSERT INTO DELIVERY_ORDER
       (
         order_id,
         customer_id,
         hub_id,
         drone_id,
         order_time,
         total_weight_kg,
         delivery_status,
         target_lat,
         target_long
       )
       VALUES
       (
         :order_id,
         :customer_id,
         :hub_id,
         :drone_id,
         :order_time,
         :total_weight_kg,
         :delivery_status,
         :target_lat,
         :target_long
       )`,
      {
        order_id: orderId,
        customer_id,
        hub_id: hubId,
        drone_id: droneId,
        order_time: order_time ? new Date(order_time) : new Date(),
        total_weight_kg,
        delivery_status: delivery_status || 'IN_TRANSIT',
        target_lat: destination_lat ?? null,
        target_long: destination_lng ?? null
      },
      { autoCommit: true }
    );

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        order_id: orderId,
        customer_id,
        hub_id: hubId,
        drone_id: droneId,
        order_time: order_time || new Date().toISOString(),
        total_weight_kg,
        delivery_status: delivery_status || 'IN_TRANSIT',
        target_lat: destination_lat ?? null,
        target_long: destination_lng ?? null
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  } finally {
    if (connection) await connection.close();
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  const orderId = Number(req.params.id);
  const { delivery_status } = req.body;

  if (!Number.isInteger(orderId) || !delivery_status) {
    return res.status(400).json({ error: 'Valid order ID and status are required' });
  }

  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `UPDATE DELIVERY_ORDER
       SET delivery_status = :delivery_status
       WHERE order_id = :order_id`,
      {
        delivery_status,
        order_id: orderId
      },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order_id: orderId,
      delivery_status
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/api/orders', async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT
         o.order_id,
         o.customer_id,
         c.name AS customer_name,
         o.hub_id,
         h.hub_name,
         o.drone_id,
         d.serial_number,
         o.order_time,
         o.total_weight_kg,
         o.delivery_status,
         o.target_lat,
         o.target_long
       FROM DELIVERY_ORDER o
       JOIN CUSTOMER c
         ON o.customer_id = c.customer_id
       JOIN HUB h
         ON o.hub_id = h.hub_id
       LEFT JOIN DRONE d
         ON o.drone_id = d.drone_id
       ORDER BY o.order_id DESC`
    );

    res.json(result.rows.map(row => ({
      order_id: row[0],
      customer_id: row[1],
      customer_name: row[2],
      hub_id: row[3],
      pickup_label: row[4],
      drone_id: row[5],
      drone_serial: row[6],
      order_time: row[7],
      total_weight_kg: row[8],
      delivery_status: row[9],
      destination_lat: row[10],
      destination_lng: row[11]
    })));

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  } finally {
    if (connection) await connection.close();
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  const orderId = Number(req.params.id);
  const { delivery_status } = req.body;

  if (!Number.isInteger(orderId) || !delivery_status) {
    return res.status(400).json({
      error: 'Valid order ID and status are required'
    });
  }

  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `UPDATE DELIVERY_ORDER
       SET delivery_status = :delivery_status
       WHERE order_id = :order_id`,
      {
        delivery_status,
        order_id: orderId
      },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    res.json({
      message: 'Order status updated successfully',
      order_id: orderId,
      delivery_status
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/api/payments', async (req, res) => {
  const { order_id: rawOrderId, amount, payment_method } = req.body;

  const orderId =
    typeof rawOrderId === 'string' && rawOrderId.startsWith('SKD-')
      ? Number(rawOrderId.replace('SKD-', ''))
      : Number(rawOrderId);

  const numericAmount = Number(amount);

  if (!Number.isInteger(orderId) || !(numericAmount > 0) || !payment_method) {
    return res.status(400).json({
      error: 'Valid order_id, amount, and payment_method are required'
    });
  }

  let connection;

  try {
    connection = await getConnection();

    // 1. Validate that the order exists in DELIVERY_ORDER
    const orderCheck = await connection.execute(
      `SELECT order_id
       FROM DELIVERY_ORDER
       WHERE order_id = :order_id`,
      { order_id: orderId }
    );

    if (!orderCheck.rows || orderCheck.rows.length === 0) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    // 2. Generate transaction_id and reference_no
    const countResult = await connection.execute(
      `SELECT COUNT(*)
       FROM PAYMENT_TRANSACTION
       WHERE order_id = :order_id`,
      { order_id: orderId }
    );

    const nextSeq = (countResult.rows[0]?.[0] || 0) + 1;
    const transactionId = `TXN-${orderId}-${String(nextSeq).padStart(3, '0')}`;
    const referenceNo = nextSeq === 1 ? `SKYREF${orderId}` : `SKYREF${orderId}-${nextSeq}`;
    const paymentStatus = 'SUCCESS';
    const normalizedMethod = String(payment_method).trim().toUpperCase();

    // 3. Insert into Oracle PAYMENT_TRANSACTION with autoCommit
    await connection.execute(
      `INSERT INTO PAYMENT_TRANSACTION
       (
         order_id,
         transaction_id,
         transaction_time,
         amount,
         payment_method,
         payment_status,
         reference_no
       )
       VALUES
       (
         :order_id,
         :transaction_id,
         :transaction_time,
         :amount,
         :payment_method,
         :payment_status,
         :reference_no
       )`,
      {
        order_id: orderId,
        transaction_id: transactionId,
        transaction_time: new Date(),
        amount: numericAmount,
        payment_method: normalizedMethod,
        payment_status: paymentStatus,
        reference_no: referenceNo
      },
      { autoCommit: true }
    );

    res.status(201).json({
      message: 'Payment successful',
      payment: {
        order_id: orderId,
        transaction_id: transactionId,
        amount: numericAmount,
        payment_method: normalizedMethod,
        payment_status: paymentStatus,
        reference_no: referenceNo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(PORT, () => {
  console.log(`SkyDrop backend running at http://localhost:${PORT}`);
});
