import { resolveShortCode } from "./redirect.service.js";
import { logClick } from "../analytics/analytics.service.js"; // 1. Ensure this is imported!

export async function handleRedirect(req, res) {
  try {
    const { code } = req.params;
    const result = await resolveShortCode(code);

    if (!result) {
      return res.status(404).send("Link not found or has been deactivated.");
    }

    // 2. Ensure this block is UNCOMMENTED
    try {
      logClick(result.id, req).catch(err => console.error("Analytics error:", err));
    } catch (analyticsError) {
      console.error("Failed to initialize click log:", analyticsError);
    }

    return res.redirect(302, result.originalUrl);
  } catch (error) {
    console.error(`Redirect error for code ${req.params?.code}:`, error);
    return res.status(500).json({ error: "Internal server error during redirection." });
  }
}