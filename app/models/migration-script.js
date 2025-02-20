const mongoose = require('mongoose');

// Connection string - update this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI;

// Define schema inline to avoid import issues
const pixelSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  color: String,
  visitorId: String,
  createdAt: { type: Date, default: Date.now }
});

const canvasSchema = new mongoose.Schema({
  pixels: [pixelSchema],
  visitorCount: { type: Number, default: 0 },
  refreshCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  isCollaborative: { type: Boolean, default: true },
  completed: { type: Boolean, default: false }
});

async function migrate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get or create the Canvas model
    const Canvas = mongoose.models.Canvas || mongoose.model('Canvas', canvasSchema);
    
    // Find canvases without isCollaborative field
    const canvasCount = await Canvas.countDocuments({
      isCollaborative: { $exists: false }
    });
    console.log(`Found ${canvasCount} canvases without isCollaborative field`);
    
    // Update all canvases without the field
    const result = await Canvas.updateMany(
      { isCollaborative: { $exists: false } },
      { $set: { isCollaborative: true } }
    );
    
    console.log(`Updated ${result.modifiedCount} canvases`);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrate();