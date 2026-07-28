import User from "./auth.model.js";
import { hashPassword, verifyPassword, generateToken } from "./auth.service.js";

export async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists." });
    }

    const hashedPassword = await hashPassword(password);
    
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    const token = generateToken(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, email: newUser.email, name: newUser.name }
    });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed", details: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    return res.status(500).json({ error: "Login failed", details: error.message });
  }
}