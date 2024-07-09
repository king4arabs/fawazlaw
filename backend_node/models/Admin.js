const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('admins', adminSchema);

// At the bottom of your file where the Admin model is defined
module.exports = Admin;
