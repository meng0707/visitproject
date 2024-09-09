const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },        // ฟิลด์ Name
  surname: { type: String, required: true },     // ฟิลด์ Surname
  username: { type: String, required: true, unique: true }, // ฟิลด์ Username
  password: { type: String, required: true },    // ฟิลด์ Password
  tel: { type: String, required: true, length: 10 }, // ฟิลด์ Tel (Char 10)
  role: { type: String, enum: ['Informer', 'Technician'], default: 'Informer' } // ฟิลด์ Role
});

module.exports = mongoose.model('user', UserSchema);
