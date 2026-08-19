const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
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

                unitPrice: {
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
            enum: ["draft", "confirmed", "completed", "cancelled"],
            default: "draft",
        },

        paymentStatus: {
            type: String,
            enum: ["unpaid", "partial", "paid"],
            default: "unpaid",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SalesOrder", salesOrderSchema);