// routes/report.js
const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const authenticateToken = require('../middleware/authenticateToken'); // นำเข้ามิดเดิลแวร์

// POST route สำหรับสร้าง report ใหม่
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.status(201).send(newReport);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create report', details: error.message });
    }
});

// GET route สำหรับดึงข้อมูล reports ทั้งหมด
router.get('/', authenticateToken, async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve reports', details: error.message });
    }
});

// PATCH route สำหรับอัปเดตสถานะของ report
router.patch('/:id/status', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
        if (!report) return res.status(404).send('Report not found');
        res.status(200).json(report);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update report status', details: err.message });
    }
});

module.exports = router;
