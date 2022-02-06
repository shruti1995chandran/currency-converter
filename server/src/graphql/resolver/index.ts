import { IResolvers } from 'graphql-tools';
import { listCountries, exchangeRatesAsPerCurrency } from './country-resolver';
export const resolverMap: IResolvers = {
  Query: {
    listCountries,
    exchangeRatesAsPerCurrency,
  },
};
