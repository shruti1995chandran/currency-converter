import { IResolvers } from 'graphql-tools';
import { listCountries } from './maincountry';
export const resolverMap: IResolvers = {
  Query: {
    listCountries,
  },
};
