require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminAuthRoutes = require('./routes/adminAuth'); 
const articleRoutes = require('./routes/articleRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

// Routes
app.use('/api/admin', adminAuthRoutes); 
app.use('/api/articles', authMiddleware.authenticate, articleRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
