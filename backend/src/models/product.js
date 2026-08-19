const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            type: String,
        },

        brand: {
            type: String,
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        unit: {
            type: String,
            required: true,
        },

        purchasePrice: {
            type: Number,
            required: true,
        },

        sellingPrice: {
            type: Number,
            required: true,
        },

        tracking: {
            batch: {
                type: Boolean,
                default: false,
            },

            expiry: {
                type: Boolean,
                default: false,
            },

            serial: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);