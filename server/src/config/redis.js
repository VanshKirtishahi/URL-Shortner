import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({
  url: redisUrl,
  // CRITICAL FIX: Add this socket configuration for cloud deployments
  socket: {
    // Automatically enable TLS if the URL starts with 'rediss://'
    tls: redisUrl?.startsWith('rediss://'),
    // Prevent Node.js from rejecting cloud provider certificates
    rejectUnauthorized: false
  }
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis instance');
});

// If you have a connect function exported, ensure it is wrapped in try/catch
export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
};

export default redisClient;