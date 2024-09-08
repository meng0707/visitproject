// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Report = require('./models/Report'); // นำเข้าโมเดล Report
const inventoryRoutes = require('./routes/inventoryRoutes');
const inventoryController = require('./controllers/inventoryController'); // ตรวจสอบเส้นทางที่ถูกต้อง
const Inventory = require('./models/Inventory'); // นำเข้าโมเดล Inventory
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//const response = await fetch('/api/inventory');


const authenticateToken = require('./middleware/authenticateToken');
const reportRoutes = require('./routes/report'); // นำเข้าเส้นทาง

const app = express(); // ประกาศ `app` ที่นี่

app.use(bodyParser.json());
app.use(express.static('public')); // ให้บริการไฟล์ static เช่น HTML, CSS, JS

// เส้นทางสำหรับหน้า dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// ในเส้นทางการลงทะเบียน (register route)
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('ชื่อผู้ใช้นี้มีอยู่แล้ว');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).send('ลงทะเบียนผู้ใช้สำเร็จ');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ในเส้นทางการล็อกอิน (login route)
app.post('/index', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');

        // สร้าง JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role }); // ส่งข้อมูล role กลับไป
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นทาง API
app.get('/api/inventory', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find(); // ดึงข้อมูลจาก MongoDB
        res.json(inventoryItems); // ส่งข้อมูลกลับเป็น JSON
    } catch (err) {
        console.error('Error retrieving inventory:', err);
        res.status(500).json({ error: 'Failed to retrieve inventory', details: err.message });
    }
});

// ใช้งานเส้นทางของรายงาน
app.use('/api/report', authenticateToken, reportRoutes); // ใช้ middleware `authenticateToken` ก่อนเส้นทางรายงาน

// ใช้เส้นทางสำหรับจัดการข้อมูลเบิกพัสดุ
app.use('/api/inventory', inventoryRoutes);

app.get('/api/inventory', inventoryController.getInventory); // ตรวจสอบว่าเส้นทางถูกต้อง

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('เชื่อมต่อ MongoDB สำเร็จ'))
    .catch(err => console.error('เชื่อมต่อ MongoDB ล้มเหลว', err));

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`เซิร์ฟเวอร์กำลังทำงานบนพอร์ต ${PORT}`));
