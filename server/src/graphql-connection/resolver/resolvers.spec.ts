import axios from 'axios';
import { exchangeRatesAsPerCurrency, listCountries } from './country-resolver';
import { Cache } from '../../utility/cache';
import {
  mockListCountriesAxios,
  mockAxiosFailure,
  mockCountriesEmpty,
  mockExchangeAxiosFailure,
  mockExchangeRate,
} from '../../axios.mocks';

describe('Graphql', () => {
  afterAll(jest.restoreAllMocks);

  describe('Resolver', () => {
    describe('listCountries', () => {
      afterEach(jest.restoreAllMocks);
      it('should return countries result', async () => {
        mockListCountriesAxios();
        const result = await listCountries();
        expect(result).toBeInstanceOf(Array);
        expect(result.length > 0).toBe(true);
      });

      it('should get the value from cache', async () => {
        mockListCountriesAxios();
        const result = await listCountries();
        expect(result).toBeInstanceOf(Array);
        expect(result.length > 0).toBe(true);
        expect(axios.get).not.toHaveBeenCalled();
      });

      it('should throw error if exception is found', async () => {
        Cache.delete('allCountries');
        mockAxiosFailure();
        await expect(listCountries()).rejects.toThrowError('error');
      });

      it('should throw error if exception is found', async () => {
        Cache.delete('allCountries');
        mockCountriesEmpty();
        await expect(listCountries()).rejects.toThrowError("Couldn't find countries");
      });
    });
    describe('exchangeRatesAsPerCurrency', () => {
      afterEach(jest.restoreAllMocks);
      it('should return exchange rates', async () => {
        mockExchangeRate();
        const result = await exchangeRatesAsPerCurrency(null, { currencyShortName: ['EUR'] });
        expect(result).toBeInstanceOf(Array);
        expect(result.length > 0).toBe(true);
      });

      it('should return empty result if nothing is found', async () => {
        mockExchangeAxiosFailure();
        await expect(exchangeRatesAsPerCurrency(null, { currencyShortName: ['EUR'] })).rejects.toThrowError(
          'Some values cannot be fetched'
        );
      });
    });
  });
});
