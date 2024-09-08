const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// POST route สำหรับส่งข้อมูลการเบิกพัสดุ
router.post('/', inventoryController.createInventory);

// GET route สำหรับดึงข้อมูลรายการเบิกพัสดุ
router.get('/', async (req, res) => {
    try {
        const inventories = await Inventory.find();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory', details: error.message });
    }
});

module.exports = router;
