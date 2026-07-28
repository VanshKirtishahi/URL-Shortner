import Counter from "./counter.model.js";
import Link from "./link.model.js";
import { encodeBase62 } from "../../shared/utils/base62.js";

export async function generateShortCode() {
  try {
    const counter = await Counter.findByIdAndUpdate(
      "linkCounter",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return encodeBase62(counter.seq);
  } catch (error) {
    throw new Error(`Failed to generate short code: ${error.message}`);
  }
}

export async function createNewLink(ownerId, originalUrl, customAlias, expiresAt) {
  try {
    const shortCode = customAlias ? customAlias : await generateShortCode();
    
    const newLink = new Link({
      owner: ownerId,
      originalUrl,
      shortCode,
      customAlias: customAlias || undefined,
      expiresAt: expiresAt || null
    });

    await newLink.save();
    return newLink;
  } catch (error) {
    throw new Error(`Failed to create link: ${error.message}`);
  }
}