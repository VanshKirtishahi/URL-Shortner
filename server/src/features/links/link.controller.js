import { createNewLink } from "./link.service.js";
import Link from "./link.model.js";
import redisClient from "../../config/redis.js";

export async function createLink(req, res) {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const ownerId = req.user.id; 

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const link = await createNewLink(ownerId, originalUrl, customAlias, expiresAt);
    
    return res.status(201).json({
      message: "Link created successfully",
      data: link
    });
  } catch (error) {
    if (error.message.includes("E11000") || error.message.includes("duplicate key error")) {
      return res.status(409).json({ error: "This custom alias is already in use." });
    }
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

export async function toggleLinkStatus(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;

    const link = await Link.findOne({ _id: id, owner: ownerId });

    if (!link) {
      return res.status(404).json({ error: "Link not found or unauthorized." });
    }

    link.isActive = !link.isActive;
    await link.save();

    await redisClient.del(`link:${link.shortCode}`);

    return res.status(200).json({
      message: `Link successfully ${link.isActive ? 'activated' : 'deactivated'}`,
      isActive: link.isActive
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update link status", details: error.message });
  }
}

export async function getUserLinks(req, res) {
  try {
    const ownerId = req.user.id;
    // Sorting by newest first
    const links = await Link.find({ owner: ownerId }).sort({ createdAt: -1 }); 
    
    return res.status(200).json({ data: links });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch links", details: error.message });
  }
}