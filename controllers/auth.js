const bcrypt = require('bcryptjs');
const User = require('../models/User');

// สมัครสมาชิก
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // ตรวจสอบว่ามีผู้ใช้ที่ใช้ชื่อผู้ใช้นี้อยู่แล้วหรือไม่
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('Username already exists');

        // แฮชรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // สร้างผู้ใช้ใหม่
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
