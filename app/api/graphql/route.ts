import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { connectToDatabase } from '../../lib/mongodb';
import { Canvas } from '../../models/canvas';

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: async () => {
    await connectToDatabase();
    return {
      db: { Canvas }
    };
  }
});

export const GET = yoga;
export const POST = yoga;