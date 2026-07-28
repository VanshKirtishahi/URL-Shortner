import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  link: { type: mongoose.Schema.Types.ObjectId, ref: "Link", required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
  referrer: { type: String, default: "direct" },
  userAgent: { type: String },
  device: { type: String },     
  browser: { type: String },    
  country: { type: String },    
});

export default mongoose.model("Click", clickSchema);