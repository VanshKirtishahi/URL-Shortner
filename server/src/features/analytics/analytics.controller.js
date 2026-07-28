import { getClicksOverTime, getReferrerBreakdown } from "./analytics.service.js";

export async function getLinkAnalytics(req, res) {
  try {
    const { linkId } = req.params;
    const days = parseInt(req.query.days, 10) || 30;

    // Execute both aggregations concurrently for better performance
    const [clicksOverTime, referrerBreakdown] = await Promise.all([
      getClicksOverTime(linkId, days),
      getReferrerBreakdown(linkId)
    ]);

    return res.status(200).json({
      clicksOverTime,
      referrerBreakdown
    });
  } catch (error) {
    return res.status(500).json({ 
      error: "Failed to fetch analytics", 
      details: error.message 
    });
  }
}