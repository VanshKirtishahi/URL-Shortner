import express from "express";
import cors from "cors";

// Import feature routers
import authRoutes from "./features/auth/auth.routes.js";
import linkRoutes from "./features/links/link.routes.js";
import analyticsRoutes from "./features/analytics/analytics.routes.js";
import redirectRoutes from "./features/redirect/redirect.routes.js";

const app = express();

// 1. Global Middlewares
app.use(cors({
  // Matches the default Vite dev server port, fallback to environment variable for production
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true
}));

// Parses incoming JSON payloads with strict error catching for malformed JSON
app.use(express.json()); 

// 2. API Feature Routes
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/analytics", analyticsRoutes);

// 3. Catch-all Redirect Route 
// This MUST be mounted last so it doesn't accidentally intercept /api routes
app.use("/", redirectRoutes); 

// 4. Global Error Handler
// Catches unhandled errors thrown anywhere in the middleware chain
app.use((err, req, res, next) => {
  console.error("Unhandled Application Error:", err);
  
  res.status(500).json({
    error: "An unexpected internal error occurred.",
    // Only leak stack traces or detailed messages in development mode
    details: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

export default app;