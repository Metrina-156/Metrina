import dns from 'dns';
// Force Node.js to use public DNS servers to resolve MongoDB SRV records on Windows
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import inquiryRouter from './routes/inquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mongoose Connection to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/metrina';
mongoose.connect(mongoUri)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('MongoDB database connection error:', err));

// Route Handlers
app.use('/api/inquiry', inquiryRouter);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
