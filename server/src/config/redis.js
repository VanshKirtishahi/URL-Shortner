import { createClient } from 'redis';

let redisUrl = process.env.REDIS_URL;

// CRITICAL FIX: Upstash requires TLS. If the provided URL starts with 'redis://' 
// instead of 'rediss://', we auto-correct it to prevent the strict protocol mismatch crash.
if (redisUrl && redisUrl.includes('upstash.io') && redisUrl.startsWith('redis://')) {
  redisUrl = redisUrl.replace('redis://', 'rediss://');
}

const isCloudProvider = redisUrl?.startsWith('rediss://');

const redisClient = createClient({
  url: redisUrl,
  socket: isCloudProvider ? {
    tls: true,
    rejectUnauthorized: false
  } : undefined,
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