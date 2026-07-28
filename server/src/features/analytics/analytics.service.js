import Click from "./analytics.model.js";
import Link from "../links/link.model.js";
import mongoose from "mongoose";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

export async function logClick(linkId, req) {
  try {
    const referrer = req.get("Referrer") || "direct";
    const userAgentString = req.get("User-Agent") || "";
    // Fallbacks for IP extraction depending on proxy/hosting setup
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

    const parser = new UAParser(userAgentString);
    const browser = parser.getBrowser().name || "unknown";
    // UAParser returns undefined for desktop by default; map it cleanly
    const device = parser.getDevice().type || "desktop"; 

    const geo = geoip.lookup(ip);
    const country = geo ? geo.country : "unknown";

    const click = new Click({
      link: linkId,
      referrer,
      userAgent: userAgentString,
      device,
      browser,
      country,
    });

    // 1. Save the detailed analytics record for the Recharts graphs
    await click.save();

    // 2. Atomically increment the total counter on the Link model for the Dashboard cards.
    // The $inc operator prevents race conditions during high-traffic traffic spikes.
    await Link.findByIdAndUpdate(
      linkId, 
      { $inc: { clickCount: 1 } },
      { new: true } // Returns the updated document (though we don't need to await its return here)
    );

  } catch (error) {
    // We log the error but do NOT throw it. 
    // This function is fire-and-forget; analytics failures should never break the redirect.
    console.error("Error logging click:", error);
  }
}

export async function getClicksOverTime(linkId, days = 30) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return await Click.aggregate([
      { $match: { link: new mongoose.Types.ObjectId(linkId), timestamp: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  } catch (error) {
    throw new Error(`Failed to aggregate clicks over time: ${error.message}`);
  }
}

export async function getReferrerBreakdown(linkId) {
  try {
    return await Click.aggregate([
      { $match: { link: new mongoose.Types.ObjectId(linkId) } },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
  } catch (error) {
    throw new Error(`Failed to aggregate referrer breakdown: ${error.message}`);
  }
}