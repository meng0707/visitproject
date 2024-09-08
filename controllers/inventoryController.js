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

// ฟังก์ชันเพื่อดึงข้อมูลเบิกพัสดุทั้งหมด
exports.getInventory = async (req, res) => {
    try {
        const inventoryItems = await Inventory.find(); // ดึงข้อมูลจากฐานข้อมูล
        res.json(inventoryItems); // ส่งข้อมูลกลับเป็น JSON
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve inventory', details: err.message }); // แสดงข้อผิดพลาด
    }
};
