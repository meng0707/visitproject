const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // อ้างอิงถึง model Report

// POST route สำหรับสร้าง report ใหม่
router.post('/', async (req, res) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.status(201).send(newReport);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET route สำหรับดึงข้อมูล reports ทั้งหมด
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
