import { Router } from "express";
import { handleRedirect } from "./redirect.controller.js";

const router = Router();

// This expects a direct parameter, e.g., domain.com/abc12
router.get("/:code", handleRedirect);

export default router;