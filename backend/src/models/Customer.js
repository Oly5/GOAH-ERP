const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        organization: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },

        customerType: {
            type: String,
            enum: ["hospital", "clinic", "pharmacy", "laboratory", "other"],
            default: "other",
        },

        creditLimit: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customer", customerSchema);