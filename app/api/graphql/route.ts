import { createYoga } from 'graphql-yoga';
import { NextRequest } from 'next/server';
import { schema } from './schema';
import { connectToDatabase } from '../../lib/mongodb';
import { Canvas } from '../../models/canvas';

const yoga = createYoga({
 schema,
 graphqlEndpoint: '/api/graphql',
 fetchAPI: { Request: Request },
 context: async () => {
   await connectToDatabase();
   return {
     db: { Canvas }
   };
 }
});

export async function GET(request: NextRequest) {
 return yoga.fetch(request);
}

export async function POST(request: NextRequest) {
 return yoga.fetch(request);
}