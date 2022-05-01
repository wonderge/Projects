import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import { buildSchemaSync } from 'type-graphql';
import { connectDB } from './../../config/db';
import { AuthResolver } from './../../resolvers/AuthResolvers';

connectDB();

export const config = {
  api: {
    bodyParser: false
  },
}

const schema = buildSchemaSync({ resolvers: [AuthResolver] })
const apolloServer = new ApolloServer({ schema, context: ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => ({ req, res }) });
const startServer = apolloServer.start();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}