require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminAuthRoutes = require('./routes/adminAuth'); // Adjust the path as needed
const bcrypt = require('bcryptjs');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

// Routes
app.use('/api/admin', adminAuthRoutes); // Adjust the prefix as needed

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
