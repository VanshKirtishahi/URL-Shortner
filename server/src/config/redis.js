import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

// Intelligently detect if we are using a managed cloud provider.
// Upstash and Redis Labs require TLS encryption, even if the connection string says 'redis://'
const isCloudProvider = redisUrl?.includes('upstash') || 
                        redisUrl?.includes('cloud.redislabs') || 
                        redisUrl?.startsWith('rediss://');

const redisClient = createClient({
  url: redisUrl,
  socket: isCloudProvider ? {
    tls: true,
    rejectUnauthorized: false
  } : undefined, // If local or Render internal, use standard unencrypted socket
  
  // Cloud providers often kill connections if they sit quiet for too long.
  // This sends a heartbeat every 10 seconds to keep the socket permanently open.
  pingInterval: 10000 
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err.message);
});

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis instance');
});

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