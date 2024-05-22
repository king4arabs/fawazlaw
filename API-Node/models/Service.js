const mongoose = require('mongoose');

// Define the Service Schema
const serviceSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  thumbnail: String,
  createdAt: Date,
  updatedAt: Date
});

// Indexing fields for better performance (optional)
serviceSchema.index({ name: 1 }); // Assuming you might query services by name often

// Create the Service model
const Service = mongoose.model('services', serviceSchema);

module.exports = Service;
