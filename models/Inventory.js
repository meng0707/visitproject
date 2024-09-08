const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['ไฟฟ้า', 'ประปา', 'อาคาร'],
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    receivedDate: {
        type: Date,
        default: Date.now
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
