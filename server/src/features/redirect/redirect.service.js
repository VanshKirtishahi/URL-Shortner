import redisClient from "../../config/redis.js";
import Link from "../links/link.model.js";

const CACHE_TTL_SECONDS = 3600; // 1 hour

export async function resolveShortCode(code) {
  try {
    // 1. Check Redis first
    const cached = await redisClient.get(`link:${code}`);
    if (cached) {
      return JSON.parse(cached); // Cache hit — zero database latency
    }

    // 2. Cache miss — fall back to MongoDB
    const link = await Link.findOne({ shortCode: code, isActive: true });
    
    if (!link) {
      return null;
    }

    // 3. Populate cache for the next request
    const payload = { originalUrl: link.originalUrl, id: link._id };
    
    await redisClient.set(
      `link:${code}`,
      JSON.stringify(payload),
      { EX: CACHE_TTL_SECONDS }
    );

    return payload;
  } catch (error) {
    throw new Error(`Failed to resolve short code: ${error.message}`);
  }
}