import { makeExecutableSchema } from '@graphql-tools/schema';

const MAX_VISITORS = 10;

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
      
      if (!canvas) {
        canvas = await db.Canvas.create({
          pixels: [],
          visitorCount: 0,
          lastUpdated: new Date()
        });
      }

      // Count unique visitors who have actually drawn
      const uniqueDrawnVisitors = new Set(canvas.pixels.map((p: any) => p.visitorId));
      canvas.visitorCount = uniqueDrawnVisitors.size;
      await canvas.save();
      
      return canvas;
    }
  },
  Mutation: {
    addPixel: async (_, { x, y, color, visitorId }, { db }) => {
      let canvas = await db.Canvas.findOne().sort({ _id: -1 });
      
      // Count unique visitors who have drawn
      const uniqueDrawnVisitors = new Set(canvas.pixels.map((p: any) => p.visitorId));
      uniqueDrawnVisitors.add(visitorId); // Add current visitor
      
      // If this would exceed visitor limit, create new canvas
      if (uniqueDrawnVisitors.size > MAX_VISITORS) {
        canvas = await db.Canvas.create({
          pixels: [],
          visitorCount: 1,
          lastUpdated: new Date()
        });
      }

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