const Supplier = require("../models/Supplier");

const createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);

        res.status(201).json({
            success: true,
            data: supplier,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();

        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSupplier,
    getSuppliers,
};