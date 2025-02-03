import mongoose from 'mongoose';

// Define the Pixel Schema
const pixelSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  color: { type: String, required: true },
  visitorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Define the Canvas Schema
const canvasSchema = new mongoose.Schema({
  pixels: [pixelSchema],
  visitorCount: { type: Number, default: 0 },
  refreshCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false }
});

// Export the model
export const Canvas = mongoose.models.Canvas || mongoose.model('Canvas', canvasSchema);