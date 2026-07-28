import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
// In production, this MUST come from your .env file
const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_key_development_only";
const JWT_EXPIRES_IN = "7d"; 

export async function hashPassword(plainTextPassword) {
  try {
    return await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
  } catch (error) {
    throw new Error("Failed to hash password.");
  }
}

export async function verifyPassword(plainTextPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (error) {
    throw new Error("Failed to verify password.");
  }
}

export function generateToken(user) {
  try {
    return jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  } catch (error) {
    throw new Error("Failed to generate authentication token.");
  }
}