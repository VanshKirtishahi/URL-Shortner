import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_key_development_only";

export function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach the decoded user payload to the request object
    req.user = decoded; 
    
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized. Token has expired." });
    }
    return res.status(403).json({ error: "Forbidden. Invalid token." });
  }
}