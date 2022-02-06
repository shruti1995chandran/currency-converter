import gql from "graphql-tag";

export const listCountries = gql`
  query countries {
    listCountries {
      name
      population
      currencies {
        name
        symbol
        shortName
      }
    }
  }
`;

export const exchangeRates = gql`
  query exchangeRatesAsPerCurrency($currencyShortName: [String!]) {
    exchangeRatesAsPerCurrency(currencyShortName: $currencyShortName) {
      exchangeRateToMultiplier
      exchangeRateFrom
      exchangeRateTo
    }
  }
`;
