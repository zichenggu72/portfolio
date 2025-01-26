import { createYoga } from 'graphql-yoga';
import { schema } from './schema';
import { NextRequest } from 'next/server';

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql'
});

export async function GET(request: NextRequest) {
  return yoga.fetch(request);
}

export async function POST(request: NextRequest) {
  return yoga.fetch(request);
}