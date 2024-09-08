const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: String,
    detail: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
