# SkyDrop – Intelligent Drone Delivery Management System 🚁

SkyDrop is a database-driven drone delivery management system designed to manage parcel deliveries weighing up to 5 kg. It provides a customer-facing web interface for placing delivery orders, selecting delivery options, simulating payments, and tracking delivery status.

The project demonstrates the integration of a React frontend, a Node.js and Express backend, and an Oracle relational database.

## ✨ Features

- **Customer Management:** Customer registration, login, and account management.
- **Drone Delivery:** Place parcel delivery orders and assign suitable drones.
- **Multiple Drone Types:** Support for cargo drones and medical rapid-response drones.
- **Hub Management:** Manage delivery hubs and associate drones and orders with hubs.
- **Simulated Payment:** Demonstrate UPI, card, and Cash on Delivery workflows without processing real payments.
- **Order Tracking:** Track delivery progress and update order status.
- **Flight Waypoint Logging:** Store flight coordinates and telemetry information.
- **Battery Monitoring:** Maintain drone battery cycle and battery health records.
- **Database Analytics:** Execute SQL joins, aggregate queries, subqueries, and views.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, JavaScript, HTML, CSS |
| Frontend Tooling | Vite |
| Backend | Node.js, Express.js |
| Database | Oracle Database 21c XE |
| Database Driver | `oracledb` |
| API Style | REST APIs |
| Version Control | Git and GitHub |

## 🏗️ System Architecture

```text
Customer
   |
   v
React Frontend
   |
   | HTTP / REST API
   v
Node.js + Express Backend
   |
   | Oracle Database Driver
   v
Oracle Database (XEPDB1)
   |
   +-- CUSTOMER
   +-- HUB
   +-- DRONE
   +-- CARGO_DRONE
   +-- MEDICAL_RAPID_DRONE
   +-- DELIVERY_ORDER
   +-- PAYMENT_TRANSACTION
   +-- FLIGHT_WAYPOINT_LOG
   +-- DRONE_BATTERY_CYCLE
```

The frontend sends requests to the backend. The backend validates requests and executes SQL operations against Oracle. The frontend does not connect directly to the database.

## 🗄️ Database Design

The project uses a relational database with nine tables.

| Table | Purpose |
|---|---|
| `CUSTOMER` | Stores customer information |
| `HUB` | Stores delivery hub information |
| `DRONE` | Stores general drone information |
| `CARGO_DRONE` | Stores cargo drone-specific details |
| `MEDICAL_RAPID_DRONE` | Stores medical drone-specific details |
| `DELIVERY_ORDER` | Stores delivery orders and their statuses |
| `PAYMENT_TRANSACTION` | Stores payment transaction records |
| `FLIGHT_WAYPOINT_LOG` | Stores flight waypoint and telemetry data |
| `DRONE_BATTERY_CYCLE` | Stores battery charging and health information |

The database design demonstrates primary keys, foreign keys, unique constraints, check constraints, relationships, specialization, and weak entities with composite primary keys.

## 🔄 Application Workflow

1. The customer registers or logs in.
2. The customer enters parcel and delivery details.
3. The system determines the delivery route and drone assignment.
4. The customer reviews the order and uses the simulated payment checkout.
5. The backend stores the order in `DELIVERY_ORDER` and the payment record in `PAYMENT_TRANSACTION`.
6. The delivery status is updated as the flight simulation progresses.
7. The completed delivery is recorded with the status `DELIVERED`.

**Note:** The payment interface is for academic demonstration. It does not process real payments through an external payment provider.

## 🚀 Getting Started

### Prerequisites

Install the following software before running the project:

- Node.js and npm
- Oracle Database 21c XE or a compatible Oracle database
- Git
- An Oracle SQL client, such as SQL*Plus or SQL Developer

### 1. Clone the Repository

```bash
git clone https://github.com/likithbandaru/skydrop-drone-management-system.git
cd skydrop-drone-management-system
```

### 2. Configure the Backend

Open a terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory using the environment variable names expected by `server.js`.

Example configuration:

```env
PORT=5000
DB_USER=your_oracle_username
DB_PASSWORD=your_oracle_password
DB_CONNECT_STRING=localhost:1521/xepdb1
```

Replace the example credentials with your own Oracle database credentials.

Ensure that Oracle is running and the required database tables and sample data have been created.

Start the backend:

```bash
node server.js
```

The backend should run on port `5000`, unless configured otherwise.

### 3. Configure the Frontend

Open another terminal from the project root:

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal to access the application.

### 4. Verify the Backend

Open the health endpoint in your browser:

```text
http://localhost:5000/api/health
```

A successful response indicates that the backend health endpoint is accessible. Check the backend logs and database configuration to verify the Oracle connection.

## 🔌 Main Backend APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend health and database connectivity |
| GET | `/api/customers` | Retrieve customer records |
| POST | `/api/customers` | Register a customer |
| POST | `/api/customers/login` | Authenticate a customer |
| GET | `/api/orders` | Retrieve delivery orders |
| POST | `/api/orders` | Create a delivery order |
| PUT | `/api/orders/:id/status` | Update delivery status |
| POST | `/api/payments` | Record a simulated payment transaction |

## 🧪 Database Demonstrations

The project supports demonstrations of:

- Multi-table joins between customers, orders, hubs, drones, and payments.
- Aggregate functions such as `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.
- `GROUP BY` and `HAVING` queries.
- Subqueries to identify customers based on their order history.
- A delivery summary view for retrieving combined order information.
- Database updates when delivery status changes.

## 🔐 Security and Configuration

- Keep database credentials in local `.env` files.
- Never commit real credentials, API keys, or secrets to GitHub.
- Use `.env.example` to document required configuration variables without including actual secrets.
- Ensure `.env` files and `node_modules` are excluded through `.gitignore`.
- Use test data for academic demonstrations.
- The simulated payment workflow must not be used to collect or process real card details.

## 🎓 Project Objective

The main objective of SkyDrop is to demonstrate how database concepts can be applied to a practical delivery management scenario. The project combines conceptual database design, relational schema implementation, SQL query development, backend API integration, and a functional web interface.

## 👨‍💻 Contributors

Developed as an academic DBMS project at Vellore Institute of Technology, Chennai.

## 📄 License

This project is developed for educational and academic demonstration purposes.
