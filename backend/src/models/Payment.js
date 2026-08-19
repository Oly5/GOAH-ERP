const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        salesOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesOrder",
            required: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "bank_transfer", "telebirr", "other"],
            default: "cash",
        },

        reference: {
            type: String,
            trim: true,
        },

        paymentDate: {
            type: Date,
            default: Date.now,
        },

        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);