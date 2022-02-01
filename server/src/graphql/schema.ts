import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    listCountries: [String]
    countries(name: String!): [Country]
  }

  type Country {
    name: String
    population: Int
    currency: [Currency]
  }

  type Currency {
    code: String
    name: String
    symbol: String
    exchangeRateToSEK: Float
  }
`;
