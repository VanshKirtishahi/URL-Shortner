import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    customAlias: { type: String, unique: true, sparse: true },
    clickCount: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// TTL Index: MongoDB automatically removes the document when the current time reaches expiresAt.
// It gracefully ignores documents where expiresAt is null or undefined.
linkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Link", linkSchema);