export interface Country {
  name: string;
  population: number;
  currencies: Currency[];
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRateToSEK: number;
}

export interface CurrenciesInfo {
  name: string;
  symbol: string;
  shortName: string;
}

export interface ListCountries {
  name: string;
  population: number;
  currencies: CurrenciesInfo[];
}

export interface CurrencyExchangeInfo {
  exchangeRateToMultiplier: number;
  exchangeRateFrom: string;
  exchangeRateTo: string;
}
