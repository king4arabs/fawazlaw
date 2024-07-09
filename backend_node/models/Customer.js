const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importing the uuid library

const customerSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), unique: true }, // Adding the unique identifier
  name: { type: String, required: true },
  number: { type: String, required: true },
  numberCode: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('customers', customerSchema);
