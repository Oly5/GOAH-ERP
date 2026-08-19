const PurchaseOrder = require("../models/PurchaseOrder");

const createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.create(req.body);

        res.status(201).json({
            success: true,
            data: purchaseOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find()
            .populate("supplier")
            .populate("items.product");

        res.status(200).json({
            success: true,
            count: purchaseOrders.length,
            data: purchaseOrders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const receivePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { batches } = req.body;

        const purchaseOrder = await PurchaseOrder.findById(id);

        if (!purchaseOrder) {
            return res.status(404).json({
                success: false,
                message: "Purchase order not found",
            });
        }

        if (purchaseOrder.status === "received") {
            return res.status(400).json({
                success: false,
                message: "Purchase order has already been received",
            });
        }

        const Inventory = require("../models/Inventory");

        for (const batch of batches) {
            await Inventory.create({
                product: batch.product,
                batchNumber: batch.batchNumber,
                expiryDate: batch.expiryDate,
                quantity: batch.quantity,
                unitCost: batch.unitCost,
                location: batch.location || "Main Warehouse",
            });
        }

        purchaseOrder.status = "received";
        await purchaseOrder.save();

        res.status(200).json({
            success: true,
            message: "Purchase order received successfully",
            data: purchaseOrder,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createPurchaseOrder,
    getPurchaseOrders,
    receivePurchaseOrder,
};