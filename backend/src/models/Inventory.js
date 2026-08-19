const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        batchNumber: {
            type: String,
            required: true,
            trim: true,
        },

        expiryDate: {
            type: Date,
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
        },

        unitCost: {
            type: Number,
            required: true,
            min: 0,
        },

        location: {
            type: String,
            default: "Main Warehouse",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Inventory", inventorySchema);