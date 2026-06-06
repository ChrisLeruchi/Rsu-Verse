const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const waitlistRoutes = require('./routes/waitlistRoutes');
const productRoutes = require('./routes/productRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(express.json());

app.use('/api/v1/waitlist', waitlistRoutes);
app.use('/api/v1/products', productRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Verse Production Gateway API is fully operational 🚀',
        version: '1.0.0'
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server.`
    });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('🚀 MongoDB Cloud Connected Successfully!');
        app.listen(PORT, () => {
            console.log(`🔥 Premium Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Critical Database Connection Failure:', err.message);
    });