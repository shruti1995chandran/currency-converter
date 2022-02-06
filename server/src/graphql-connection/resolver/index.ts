import { listCountries, exchangeRatesAsPerCurrency } from './country-resolver';
export const resolverMap = {
  Query: {
    listCountries,
    exchangeRatesAsPerCurrency,
  },
};
