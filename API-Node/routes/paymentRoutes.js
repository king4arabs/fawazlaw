const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust the path according to your project structure

// Get all services
router.get('/', paymentController.sendPayment);

module.exports = router;
