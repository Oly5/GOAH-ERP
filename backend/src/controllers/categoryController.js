const Category = require("../models/Category");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = await Category.create({
            name,
            description,
        });

        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCategory,getCategories,
};