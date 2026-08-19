const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
    {
        poNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                unitCost: {
                    type: Number,
                    required: true,
                    min: 0,
                },

                total: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["draft", "pending", "received", "cancelled"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);