const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Technician', 'User'], default: 'User' } // เพิ่มฟิลด์ role
});
  
module.exports = mongoose.model('user', UserSchema);

