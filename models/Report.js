// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: String,
    detail: String,
    location: String,
    status: {
        type: String,
        enum: [
            'Pending',
            'Awaiting Inspection',
            'In Repair',
            'Repair Completed',
            'Repair Successful',
            'Repair Unsuccessful'
        ],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
