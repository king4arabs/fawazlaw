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

const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

if (!process.env.MONGODB_URI) {
 console.error('MONGODB_URI is required to start the Node API.');
 process.exit(1);
}

if (!process.env.JWT_SECRET) {
 console.error('JWT_SECRET is required to start the Node API.');
 process.exit(1);
}

mongoose.set('strictQuery', true);

// Middleware
app.disable('x-powered-by');
app.use((req, res, next) => {
 res.setHeader('X-Content-Type-Options', 'nosniff');
 res.setHeader('X-Frame-Options', 'DENY');
 res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
 next();
});
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));

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
