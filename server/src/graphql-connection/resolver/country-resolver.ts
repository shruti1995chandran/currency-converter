import { Cache } from '../../utility/cache';
import { AxiosUtil } from '../../utility/axios';
import { Configuration } from '../../utility/config';
import { CurrenciesInfo, CountryInfo } from '../interface/country';
import { ExchangeRate } from '../interface/exchange-rates';
import { CurrencyExchangeInfo } from '../interface/currency-exchange';
interface ListCountries {
  name: string;
  population: number;
  currencies: CurrenciesInfo[];
}

/**
 * Resolver to get the countries information
 * @returns {ListCountries[]}
 */
export const listCountries = async (): Promise<ListCountries[]> => {
  return getAllCountries();
};

/**
 * It will return countries information from cache if present else will get it from API
 * NOTE: Currently, we are assuming that population won't change that frequently hence caching the data for 1 hour or as per the configuration key
 * @returns Promise<ListCountries[]>
 */
const getAllCountries = async (): Promise<ListCountries[]> => {
  const allCountries = Cache.get('allCountries');
  if (allCountries) {
    return JSON.parse(allCountries);
  } else {
    const countries = <CountryInfo[]>await AxiosUtil.get(`${Configuration.COUNTRIES_BASE_URL}/all`);
    if (!countries) {
      throw new Error("Couldn't find countries");
    }
    const countriesList = countries.map(({ name, currencies, population }) => ({
      name: name.official,
      currencies: currencies
        ? Object.keys(currencies).map((key) => ({
            shortName: key,
            name: currencies[key].name,
            symbol: currencies[key].symbol,
          }))
        : [],
      population,
    }));
    Cache.put('allCountries', JSON.stringify(countriesList), <number>Configuration.COUNTRIES_LIST_CACHE_DURATION);
    return countriesList;
  }
};

/**
 * Resolver to get exchange rates as per the passed currencies in params
 * @param _ argument to hold unknown
 * @param {currencyShortName:string}[] This will hold the list of currencies to get the conversion rate
 * @returns {CurrencyExchangeInfo[]}
 */
export const exchangeRatesAsPerCurrency = async (
  _: unknown,
  { currencyShortName }: { currencyShortName: string[] }
): Promise<CurrencyExchangeInfo[]> => {
  const promises = currencyShortName.map((name) => getCurrencyRates(name));
  const exchangeRates = await Promise.all(promises);
  // const checkSuccess = exchangeRates && exchangeRates.some(({ success }) => !success);
  // if (!checkSuccess || checkSuccess.length == 0) {
  if (exchangeRates && exchangeRates.some(({ success }) => !success)) {
    //console.error('Error in exchange rate', exchangeRates);
    throw new Error('Some values cannot be fetched');
  } else {
    return getConversionToSEK(exchangeRates);
  }
};

const getConversionToSEK = (exchangeRates: ExchangeRate[]): CurrencyExchangeInfo[] => {
  return exchangeRates.map(({ base, rates }) => ({
    exchangeRateFrom: base,
    exchangeRateTo: Configuration.STATIC_CURRENCY_CONVERSION,
    // NOTE- This will allow us to use in frontend to get the appropriate value
    exchangeRateToMultiplier: 1 / rates[Configuration.STATIC_CURRENCY_CONVERSION],
  }));
};

/**
 * NOTE: Currently we are using the free tier and free tier only supports base as EUR and hence we will need to manually get the SEK conversion
 * If we have premium version then we could have used base as 'SEK' and symbolTo as array of string to get the conversion rate in one api hit
 * Example:
 * https://data.fixer.io
    ? access_key = API_KEY
    & base = SEK
    & symbols = USD,CAD,EUR
 * @param base Currency to use as base
 * @param symbolTo Rate of the currency required from the base currency
 * @returns Promise<ExchangeRate> It will return information related to the conversion
 */
const getCurrencyRates = async (
  base: string,
  symbolTo = Configuration.STATIC_CURRENCY_CONVERSION
): Promise<ExchangeRate> => {
  return AxiosUtil.get(
    `${Configuration.FIXER_BASE_URL}?access_key=${Configuration.FIXER_API_KEY}&base=${base}&symbols=${symbolTo}`
  );
};
