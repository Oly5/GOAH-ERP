const Inventory = require("../models/Inventory");

const addInventory = async (req, res) => {
    try {
        const inventory = await Inventory.create(req.body);

        res.status(201).json({
            success: true,
            data: inventory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find()
            .populate("product");

        res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addInventory,
    getInventory,
};