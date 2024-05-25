const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust the path according to your project structure

// Get all services
router.post('/', paymentController.sendPayment);
router.post("/execute", paymentController.executePayment)

module.exports = router;
