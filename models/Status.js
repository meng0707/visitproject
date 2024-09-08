// models/Status.js
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    title: String,
    detail: String,
    location: String,
    status: {
        type: String,
        enum: [
            'Pending', // รอดำเนินการ
            'Awaiting Inspection', // รอตรวจสอบ
            'In Repair', // กำลังซ่อม
            'Repair Completed', // การซ่อมเสร็จสิ้น
            'Repair Successful', // ซ่อมได้
            'Repair Unsuccessful' // ซ่อมไม่ได้
        ],
        default: 'Pending' // ค่าเริ่มต้นคือ รอดำเนินการ
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
