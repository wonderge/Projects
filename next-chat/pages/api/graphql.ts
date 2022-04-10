import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/typeDefs';

export const config = {
  api: {
    bodyParser: false
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => ({ req, res }) });

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await apolloServer.start();
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}