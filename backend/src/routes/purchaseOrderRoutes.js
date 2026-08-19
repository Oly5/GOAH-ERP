const express = require("express");

const {
    createPurchaseOrder,
    getPurchaseOrders,
    receivePurchaseOrder,
} = require("../controllers/purchaseOrderController");

const router = express.Router();

router.post("/", createPurchaseOrder);
router.get("/", getPurchaseOrders);
router.post("/:id/receive", receivePurchaseOrder);

module.exports = router;