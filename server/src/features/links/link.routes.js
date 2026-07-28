import { Router } from "express";
import { createLink, toggleLinkStatus, getUserLinks } from "./link.controller.js";
import { rateLimiter } from "../../middlewares/rateLimiter.js";
import { verifyJWT } from "../auth/auth.middleware.js"; 

const router = Router();

// GET /api/links
// Fetches all links belonging to the authenticated user
router.get("/", verifyJWT, getUserLinks);

// POST /api/links
// Creates a new short link. Limited to 10 requests per minute per IP.
router.post(
  "/", 
  verifyJWT,
  rateLimiter({ windowSeconds: 60, maxRequests: 10 }), 
  createLink
);

// PATCH /api/links/:id/status
// Toggles the isActive boolean for a specific link
router.patch("/:id/status", verifyJWT, toggleLinkStatus);

export default router;