const express = require("express");

const {
    createSalesOrder,
    getSalesOrders,
    completeSalesOrder,
} = require("../controllers/salesOrderController");

const router = express.Router();

router.post("/", createSalesOrder);
router.get("/", getSalesOrders);
router.post("/:id/complete", completeSalesOrder);

module.exports = router;