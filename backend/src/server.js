console.log("Starting GOAH ERP server...");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const salesOrderRoutes = require("./routes/salesOrderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connect database
connectDB();

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales-orders", salesOrderRoutes);
app.use("/api/payments", paymentRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "GOAH ERP API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});