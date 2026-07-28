import 'dotenv/config'; // Ensure environment variables are loaded first
import app from './app.js';
import mongoose from 'mongoose';
import { connectRedis } from './config/redis.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1. Connect to Redis
    await connectRedis();

    // 2. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB');

    // 3. Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();