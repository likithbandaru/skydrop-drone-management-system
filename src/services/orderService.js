const API_URL = 'http://localhost:5000/api';

export const orderService = {
  async getAll() {
    const response = await fetch(`${API_URL}/orders`);

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const orders = await response.json();

    return orders.map(order => ({
      ...order,
      pickup_label: order.pickup_label,
      destination_label: order.destination_label || 'OMR Cyber Vale, Sholinganallur',
      product_name: order.product_name || 'Critical Medical Consignment',
      drone_id: order.drone_serial || order.drone_id,
      total_weight_kg: order.total_weight_kg,
      delivery_status: order.delivery_status
    }));
  },

  async getById(orderId) {
    const orders = await this.getAll();

    return orders.find(
      order => String(order.order_id) === String(orderId)
    ) || null;
  },

  async getByCustomerId(customerId) {
    const orders = await this.getAll();

    if (!customerId) {
      return orders;
    }

    return orders.filter(
      order => String(order.customer_id) === String(customerId)
    );
  },

  async getActiveOrder() {
    const orders = await this.getAll();

    return (
      orders.find(order => order.delivery_status === 'IN_TRANSIT') ||
      orders[0] ||
      null
    );
  },

  async create(newOrder) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: newOrder.customer_id || 101,
        pickup_label: newOrder.pickup_label || 'Central Metro Hub',
        drone_id: newOrder.drone_id,
        order_time: newOrder.order_time,
        total_weight_kg: newOrder.total_weight_kg,
        delivery_status: newOrder.delivery_status || 'IN_TRANSIT',
        destination_lat: newOrder.destination_lat,
        destination_lng: newOrder.destination_lng
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create order');
    }

    const result = await response.json();

    return {
      ...newOrder,
      order_id: result.order.order_id,
      customer_id: result.order.customer_id,
      hub_id: result.order.hub_id,
      drone_id: newOrder.drone_id,
      order_time: result.order.order_time,
      total_weight_kg: result.order.total_weight_kg,
      delivery_status: result.order.delivery_status,
      target_lat: result.order.target_lat,
      target_long: result.order.target_long
    };
  },

  async updateStatus(orderId, status) {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ delivery_status: status })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update order status');
    }

    const result = await response.json();

    return result;
  },

  async createPayment(paymentData) {
    const response = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_id: paymentData.order_id,
        amount: paymentData.amount,
        payment_method: paymentData.payment_method
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to process payment');
    }

    const result = await response.json();

    return result;
  }
};