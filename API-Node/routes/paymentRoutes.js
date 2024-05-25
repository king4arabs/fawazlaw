const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust the path according to your project structure

// Get all services
router.post('/', paymentController.sendPayment);

module.exports = router;
