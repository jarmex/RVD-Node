import path from 'path';

import { mergeTypes, fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolversArray = fileLoader(path.join(__dirname, './Resolvers'), {
  extensions: ['.js'],
});

const typearray = fileLoader(path.join(__dirname, './Schemas'), {
  extensions: ['.gql'],
  recursive: true,
});

export const typeDefs = mergeTypes(typearray, { all: true });

export const resolvers = mergeResolvers(resolversArray);
