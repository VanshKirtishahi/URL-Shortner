import { Router } from "express";
import { getLinkAnalytics } from "./analytics.controller.js";
import { verifyJWT } from "../auth/auth.middleware.js"; 

const router = Router();

// GET /api/analytics/:linkId
// Retrieves aggregated click data for a specific link
router.get(
  "/:linkId",
  // verifyJWT, // To be activated once Auth is built to ensure users only see their own link data
  getLinkAnalytics
);

export default router;