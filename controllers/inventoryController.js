const Inventory = require('../models/Inventory');

// สร้างการเบิกพัสดุใหม่
exports.createInventory = async (req, res) => {
    try {
        const { category, productName, quantity, receivedDate } = req.body;

        // ตรวจสอบค่าที่ได้รับจาก req.body
        if (!category || !productName || !quantity || !receivedDate) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // สร้างรายการพัสดุใหม่
        const inventoryEntry = new Inventory({
            category,
            productName,
            quantity,
            receivedDate
        });

        await inventoryEntry.save();
        res.status(201).json({ message: 'Request submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
