const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/servicesController'); // Adjust the path according to your project structure

// Get all services
router.get('/', serviceController.getAllServices);

// Create a new service
// router.post('/', serviceController.createService);

// Get a single service by ID
router.get('/:serviceId', serviceController.getServiceById);

// // Update a service by ID
// router.put('/:id', serviceController.updateService);

// // Delete a service by ID
// router.delete('/:id', serviceController.deleteService);

module.exports = router;
