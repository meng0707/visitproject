const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Report = require('./models/Report'); // นำเข้าโมเดล Report
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = require('./middleware/authenticateToken');
const reportRoutes = require('./routes/report'); // นำเข้าเส้นทางแจ้งซ่อม

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // ให้บริการไฟล์ static เช่น HTML, CSS, JS

// เส้นทางสำหรับหน้า dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// เส้นทางสำหรับการสมัครสมาชิก
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('ชื่อผู้ใช้นี้มีอยู่แล้ว');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send('ลงทะเบียนผู้ใช้สำเร็จ');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นทางสำหรับการล็อกอิน
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');

        // สร้าง JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นทางแจ้งซ่อม
app.use('/api', reportRoutes);

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('เชื่อมต่อ MongoDB สำเร็จ'))
    .catch(err => console.error('เชื่อมต่อ MongoDB ล้มเหลว', err));

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`เซิร์ฟเวอร์กำลังทำงานบนพอร์ต ${PORT}`));
