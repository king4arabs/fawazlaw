const mongoose = require('mongoose');

// Define the Service Schema
const serviceSchema = new mongoose.Schema({
  service_id: Number,
  title: String,
  content: String,
  price: Number,
  currency: String,
  thumbnail: String,
  content_en: String, 
  title_en: String
});


// Create the Service model
const Service = mongoose.model('services', serviceSchema);

module.exports = Service;
