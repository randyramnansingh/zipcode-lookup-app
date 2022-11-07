import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import * as zipcodes from './zipcodes/index.js';

const typeDefs = `#graphql
  type Query
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, zipcodes.typeDef],
  resolvers: [zipcodes.resolvers],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.NODE_PORT) || 4000 },
});

console.log(`🚀 GQL Server ready at: ${url}`);