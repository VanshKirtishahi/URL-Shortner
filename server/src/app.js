import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectRedis } from './config/redis.js';

// Route Imports
import authRoutes from './features/auth/auth.routes.js';
import linkRoutes from './features/links/link.routes.js';
import analyticsRoutes from './features/analytics/analytics.routes.js';
import redirectRoutes from './features/redirect/redirect.routes.js';

dotenv.config();

const app = express();

// --- THE CORS FIX ---
// Whitelist both local development and the production Vercel domain
const allowedOrigins = [
  'http://localhost:5173',
  'https://url-shortner-nu-seven.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Required if you are sending cookies or authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// --------------------

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/', redirectRoutes); // Catch-all for shortcodes

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB');

    // 2. Connect to Redis
    await connectRedis();

    // 3. Start Express
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();