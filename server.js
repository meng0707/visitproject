const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// นำเข้า middleware
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // เพื่อให้สามารถให้บริการไฟล์ static เช่น HTML, CSS, JS

// เส้นทางสำหรับหน้า dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// เส้นทางสำหรับการสมัครสมาชิก
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('Username already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นทางสำหรับการล็อกอิน
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid username or password');

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send('Invalid username or password');

        // สร้าง JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
