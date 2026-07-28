import redisClient from "../config/redis.js";

export function rateLimiter({ windowSeconds = 60, maxRequests = 10 }) {
  return async (req, res, next) => {
    try {
      // Fallback to ensure we always have an identifier
      const ip = req.ip || req.connection?.remoteAddress || "unknown_ip";
      const key = `ratelimit:${ip}`;
      
      const current = await redisClient.incr(key);

      // If this is the first request in the current window, set the TTL
      if (current === 1) {
        await redisClient.expire(key, windowSeconds);
      }

      // If they exceed the limit, block the request
      if (current > maxRequests) {
        return res.status(429).json({ 
          error: "Too many requests. Please try again later." 
        });
      }

      next();
    } catch (error) {
      console.error("Rate limiter encountered an error:", error);
      // In production, you typically "fail open" (allow the request) 
      // if the rate limiter fails, so a Redis outage doesn't take down your whole API.
      next();
    }
  };
}