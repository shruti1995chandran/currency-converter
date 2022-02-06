import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    listCountries: [CountryInfo]
    exchangeRatesAsPerCurrency(currencyShortName: [String!]): [ExchangeRateInfo]
  }

  type CountryInfo {
    name: String
    population: Int
    currencies: [CurrencyInfo]
  }

  type CurrencyInfo {
    name: String
    symbol: String
    shortName: String
  }

  type ExchangeRateInfo {
    exchangeRateToMultiplier: Float
    exchangeRateFrom: String
    exchangeRateTo: String
  }
`;
