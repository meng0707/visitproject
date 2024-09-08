const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth');

// เส้นทางสำหรับการสมัครสมาชิก
router.post('/register', register);

module.exports = router;
