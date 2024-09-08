// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // ถ้าไม่มี token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // ถ้า token ไม่ถูกต้อง
        req.user = user;
        next();
    });
}

// Middleware เพื่อตรวจสอบว่าสิทธิ์ของผู้ใช้เป็นช่างซ่อมหรือไม่
function checkIfTechnician(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // ดึง JWT จาก header
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // ถ้า token ไม่ถูกต้อง
        if (user.role === 'Technician') {
            req.user = user; // เก็บข้อมูลผู้ใช้ใน req
            next(); // อนุญาตให้เข้าถึงถ้าเป็นช่างซ่อม
        } else {
            res.status(403).send('Access denied'); // ปฏิเสธการเข้าถึงถ้าไม่ใช่ช่างซ่อม
        }
    });
}


module.exports = authenticateToken;
