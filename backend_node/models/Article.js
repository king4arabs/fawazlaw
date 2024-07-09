const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importing the uuid library

const articleSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), unique: true }, // Adding the unique identifier
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('articles', articleSchema);
