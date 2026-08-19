const express = require("express");

const {
    addInventory,
    getInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", addInventory);
router.get("/", getInventory);

module.exports = router;