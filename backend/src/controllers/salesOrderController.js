const SalesOrder = require("../models/SalesOrder");

const createSalesOrder = async (req, res) => {
    try {
        console.log("REQUEST BODY:", req.body);
        const salesOrder = await SalesOrder.create(req.body);

        res.status(201).json({
            success: true,
            data: salesOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSalesOrders = async (req, res) => {
    try {
        const salesOrders = await SalesOrder.find()
            .populate("customer")
            .populate("items.product");

        res.status(200).json({
            success: true,
            count: salesOrders.length,
            data: salesOrders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const completeSalesOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const salesOrder = await SalesOrder.findById(id);

        if (!salesOrder) {
            return res.status(404).json({
                success: false,
                message: "Sales order not found",
            });
        }

        if (salesOrder.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Sales order is already completed",
            });
        }

        const Inventory = require("../models/Inventory");

        // Process every product in the sale
        for (const item of salesOrder.items) {

            let remainingQuantity = item.quantity;

            // Find inventory batches and sort by earliest expiry
            const inventoryBatches = await Inventory.find({
                product: item.product,
                quantity: { $gt: 0 },
            }).sort({
                expiryDate: 1,
            });

            // Check total available stock
            const totalAvailable = inventoryBatches.reduce(
                (total, batch) => total + batch.quantity,
                0
            );

            if (totalAvailable < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${item.product}`,
                });
            }

            // Deduct using FEFO
            for (const batch of inventoryBatches) {
                if (remainingQuantity <= 0) {
                    break;
                }

                const quantityToTake = Math.min(
                    batch.quantity,
                    remainingQuantity
                );

                batch.quantity -= quantityToTake;

                await batch.save();

                remainingQuantity -= quantityToTake;
            }
        }

        salesOrder.status = "completed";

        await salesOrder.save();

        res.status(200).json({
            success: true,
            message: "Sales order completed and inventory updated",
            data: salesOrder,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSalesOrder,
    getSalesOrders,
    completeSalesOrder,
};