# GOAH ERP ( Medical Supply Management System )

A full-stack ERP project designed for **GOAH Medical Material Supplier**, a medical supply reseller serving hospitals, clinics, pharmacies, and laboratories in Ethiopia.

GOAH ERP helps manage products, suppliers, purchasing, inventory, customer orders, batch expiry, and payments through a centralized system. The project is being developed as a practical business solution and a software engineering portfolio project.

## Features

### Product & Category Management
- Create and manage medical supply categories.
- Store product information, including SKU, name, brand, unit, and prices.
- Configure batch, expiry date, and serial number tracking.

### Supplier Management
- Maintain supplier information.
- Organize supplier records for purchasing operations.

### Purchasing & Inventory
- Manage purchase orders and receiving workflows.
- Track inventory quantities by product and batch.
- Store batch numbers, expiry dates, unit costs, and warehouse locations.
- Implement **FEFO (First Expired, First Out)** stock deduction for sales.

### Customer Management
- Maintain hospital, clinic, pharmacy, and laboratory customer records.
- Store contact details, customer types, and credit limits.

### Sales Order Management
- Create sales orders for business customers.
- Track order status and payment status.
- Deduct inventory when a sales order is completed.
- Prevent sales from proceeding when available inventory is insufficient.

### Payment Management
- Record customer payments against sales orders.
- Support partial and full payments.
- Track payment methods, transaction references, and payment notes.
- Calculate the remaining balance.
- Automatically update payment status to `partial` or `paid`.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and routing |
| MongoDB Atlas | Remote database |
| Mongoose | Database schemas, models, and validation |
| dotenv | Environment configuration |
| CORS | Cross-origin request support |
| Nodemon | Development server auto-restart |

**Planned frontend:** React.js with Tailwind CSS.

## Project Structure

```text
goah-erp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── categoryController.js
│   │   │   ├── productController.js
│   │   │   ├── inventoryController.js
│   │   │   ├── supplierController.js
│   │   │   ├── purchaseOrderController.js
│   │   │   ├── customerController.js
│   │   │   ├── salesOrderController.js
│   │   │   └── paymentController.js
│   │   ├── models/
│   │   │   ├── Category.js
│   │   │   ├── Product.js
│   │   │   ├── Inventory.js
│   │   │   ├── Supplier.js
│   │   │   ├── PurchaseOrder.js
│   │   │   ├── Customer.js
│   │   │   ├── SalesOrder.js
│   │   │   └── Payment.js
│   │   ├── routes/
│   │   │   ├── categoryRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── inventoryRoutes.js
│   │   │   ├── supplierRoutes.js
│   │   │   ├── purchaseOrderRoutes.js
│   │   │   ├── customerRoutes.js
│   │   │   ├── salesOrderRoutes.js
│   │   │   └── paymentRoutes.js
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── README.md
```

*The structure above represents the intended organization; filenames may vary slightly as development continues.*

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Postman](https://www.postman.com/) or another REST API client
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Oly5/GOAH-ERP
cd goah-erp/backend
```


### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
```

### 4. Start the Development Server

```bash
npm run dev
```

The API runs at:

```text
http://localhost:5000
```

Test the root endpoint:

```http
GET http://localhost:5000/
```

Expected response:

```json
{
  "message": "GOAH ERP API is running"
}
```

## API Endpoints

Base URL: `http://localhost:5000`

| Module | Method | Endpoint | Purpose |
|---|---|---|---|
| Categories | GET | `/api/categories` | Retrieve categories |
| Products | GET | `/api/products` | Retrieve products |
| Inventory | GET | `/api/inventory` | Retrieve inventory batches |
| Suppliers | GET | `/api/suppliers` | Retrieve suppliers |
| Purchase Orders | GET | `/api/purchase-orders` | Retrieve purchase orders |
| Customers | GET | `/api/customers` | Retrieve customers |
| Sales Orders | GET | `/api/sales-orders` | Retrieve sales orders |
| Sales Orders | POST | `/api/sales-orders` | Create a sales order |
| Sales Orders | POST | `/api/sales-orders/:id/complete` | Complete a sale and deduct stock |
| Payments | GET | `/api/payments` | Retrieve recorded payments |
| Payments | POST | `/api/payments` | Record a customer payment |

Additional CRUD and receiving endpoints depend on the current implementation.

## Example Business Workflow

A typical transaction in GOAH ERP follows this process:

1. Register a medical supply product.
2. Register a supplier and create a purchase order.
3. Receive stock and record its batch number and expiry date.
4. Register a hospital or clinic as a customer.
5. Create a sales order.
6. Complete the order and deduct stock using FEFO.
7. Record full or partial customer payments.
8. Track the remaining balance and payment status.

### Example Transaction

| Description | Amount |
|---|---:|
| Customer | St. Peter Hospital |
| Product | Examination Gloves |
| Quantity sold | 20 boxes |
| Unit selling price | 1,500 ETB |
| Sales total | 30,000 ETB |
| First payment | 10,000 ETB |
| Second payment | 20,000 ETB |
| Outstanding balance | 0 ETB |

The inventory quantity decreases from 500 to 480 boxes after the sale. The two payments settle the 30,000 ETB sales order in full.

## Current Development Status

- [x] Express server setup
- [x] MongoDB Atlas connection
- [x] Mongoose data models
- [x] Category and product management
- [x] Supplier management
- [x] Inventory batch tracking
- [x] Purchase order workflows
- [x] Customer management
- [x] Sales order creation
- [x] FEFO inventory deduction
- [x] Partial and full payment recording
- [x] Payment balance calculation
- [ ] Dashboard summary API
- [ ] React frontend and dashboard
- [ ] Authentication and role-based access
- [ ] Automated tests
- [ ] Production deployment

## Future Improvements

- Low-stock alerts and near-expiry notifications.
- Invoice generation and printable receipts.
- Customer accounts receivable reports.
- Sales and inventory analytics.
- User authentication and permissions.
- Audit logs for inventory and payment changes.
- Automated tests and production deployment.

## Project Goals

GOAH ERP is being built to practice real-world software engineering concepts, including REST API design, MongoDB data modeling, database relationships, business logic, inventory management, validation, and financial transaction workflows.

The long-term goal is to deliver a practical, maintainable ERP application tailored to the needs of a medical supply reseller.

## License

This project is currently a portfolio and learning project. A formal open-source license can be added when the project is ready for public distribution.
