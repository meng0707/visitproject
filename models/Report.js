// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: String,
    detail: String,
    location: String,
    status: {
        type: String,
        enum: [
            'รอดำเนินการ',
            'กำลังดำเนินการ',
            'ดำเนินการเสร็จสิ้น (ซ่อมได้)',
            'ดำเนินการเสร็จสิ้น (ซ่อมไม่ได้)'
        ],
        default: 'รอดำเนินการ'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
