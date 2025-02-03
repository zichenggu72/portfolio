import { makeExecutableSchema } from '@graphql-tools/schema';

const MAX_VISITORS = 10;
const GRID_SIZE = 22; // Match your frontend grid size
const MAX_PIXELS = GRID_SIZE * GRID_SIZE; // Total possible pixels

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
    completed: Boolean!
  }

  type Query {
    activeCanvas: Canvas!
  }

  type Mutation {
    addPixel(x: Int!, y: Int!, color: String!, visitorId: String!): Pixel!
  }
`;

const resolvers = {
  Query: {
    activeCanvas: async (_, __, { db }) => {
      let canvas = await db.Canvas.findOne().sort({ _id: -1 });
      
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
    }
  },
  Mutation: {
    addPixel: async (_, { x, y, color, visitorId }, { db }) => {
      let canvas = await db.Canvas.findOne().sort({ _id: -1 });
      
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
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});