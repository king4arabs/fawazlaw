// routes/admin.js
const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin login route
router.post('/login', adminAuthController.login);

// Admin logout route
router.post('/logout', adminAuthController.logout);

module.exports = router;
