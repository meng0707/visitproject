// controllers/reportController.js
const Report = require('../models/Report');

// สร้างคำร้องซ่อม
exports.createReport = async (req, res) => {
    const { title, detail, location, status } = req.body;
    try {
        const report = new Report({ title, detail, location, status });
        await report.save();
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// อัปเดตสถานะของคำร้องซ่อม
exports.updateReportStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const report = await Report.findByIdAndUpdate(id, { status }, { new: true });
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
