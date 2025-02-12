import { makeExecutableSchema } from '@graphql-tools/schema';

const MAX_VISITORS = 10;
const GRID_SIZE = 23; // Changed from 40 to match your frontend
const MAX_PIXELS = GRID_SIZE * GRID_SIZE; // Now 484 pixels instead of 1600

const typeDefs = `
  type Pixel {
    x: Int!
    y: Int!
    color: String!
    visitorId: String!
    createdAt: String!
  }

  type Canvas {
    id: ID!
    pixels: [Pixel!]!
    visitorCount: Int!
    lastUpdated: String!
    isCollaborative: Boolean!
    completed: Boolean!
  }

  type Query {
    activeCanvas: Canvas!
    completedCanvases: [Canvas!]!
  }

  type Mutation {
    addPixel(x: Int!, y: Int!, color: String!, visitorId: String!, isCollabrative: Boolean): Pixel!
    saveCanvas(visitorId: String!, isCollaborative: Boolean): String!
  }
`;

const resolvers = {
  Query: {
    activeCanvas: async (_, {isCollaborative = true}, { db }) => {
      let canvas = await db.Canvas.findOne({ isCollaborative: isCollaborative }).sort({ _id: -1 });
      
      // Create new canvas if none exists or if current one is full
      if (!canvas || canvas.pixels.length >= MAX_PIXELS || canvas.visitorCount >= MAX_VISITORS) {
        // Mark current canvas as completed if it exists
        if (canvas) {
          canvas.completed = true;
          await canvas.save();
        }
        
        canvas = await db.Canvas.create({
          pixels: [],
          visitorCount: 0,
          lastUpdated: new Date(),
          completed: false
        });
      }

      return canvas;
    },
    completedCanvases: async (_, __, { db }) => {
      // Find all completed canvases, sorted by most recent
      const canvases = await db.Canvas.find({ 
        completed: true 
      }).sort({ 
        lastUpdated: -1 
      });
      
      console.log('Found completed canvases:', canvases.length); // Debug log
      return canvases;
    }
  },
  Mutation: {
    addPixel: async (_, { x, y, color, visitorId, isCollaborative = true }, { db }) => {
      let canvas = await db.Canvas.findOne({ isCollaborative: isCollaborative }).sort({ _id: -1 });
      
      // Count unique visitors who have drawn
      const uniqueDrawnVisitors = new Set(canvas.pixels.map((p: any) => p.visitorId));
      uniqueDrawnVisitors.add(visitorId);
      
      // Check if canvas should be reset BEFORE adding new pixel
      if (canvas.pixels.length >= MAX_PIXELS || uniqueDrawnVisitors.size > MAX_VISITORS) {
        // Mark current canvas as completed
        canvas.completed = true;
        await canvas.save();
        
        // Create new canvas without any pixels
        canvas = await db.Canvas.create({
          pixels: [],
          visitorCount: 0,
          lastUpdated: new Date(),
          isCollaborative: isCollaborative,
          completed: false
        });
        
        // Now add the new pixel to the fresh canvas
        const pixel = { x, y, color, visitorId, createdAt: new Date().toISOString() };
        canvas.pixels = [pixel];
        canvas.visitorCount = 1;
        await canvas.save();
        return pixel;
      }

      // Normal case - add pixel to existing canvas
      const pixel = { x, y, color, visitorId, createdAt: new Date().toISOString() };
      canvas.pixels.push(pixel);
      canvas.visitorCount = uniqueDrawnVisitors.size;
      canvas.lastUpdated = new Date();
      await canvas.save();
      
      return pixel;
    },
    saveCanvas: async (_, {visitorId, isCollaborative = true }, { db }) => {
      let canvas = await db.Canvas.findOne({ isCollaborative: isCollaborative }).sort({ _id: -1 });
      
      // Count unique visitors who have drawn
      const uniqueDrawnVisitors = new Set(canvas.pixels.map((p: any) => p.visitorId));
      uniqueDrawnVisitors.add(visitorId);
      
      // Mark current canvas as completed
      canvas.completed = true;
      await canvas.save();
      return visitorId;
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});