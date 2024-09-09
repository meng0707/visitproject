// models/Status.js
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
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

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
