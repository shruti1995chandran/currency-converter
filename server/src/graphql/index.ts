import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { resolverMap } from './resolver';
import { typeDefs } from './schema';
export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: resolverMap,
});
