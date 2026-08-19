const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(201).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
};