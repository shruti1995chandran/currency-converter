import { AxiosUtil } from '../../utility/axios';
import { ICountry } from '../interface/country';
import { Configuration } from '../../utility/config';
import { Cache } from '../../utility/cache';

export const listCountries = async (): Promise<string[]> => {
  const countries = await getAllCountries();
  return countries;
};

const getAllCountries = async (): Promise<string[]> => {
  const allCountries = Cache.get('allCountries');
  if (allCountries) {
    return JSON.parse(allCountries);
  } else {
    const countries = (await AxiosUtil.get(
      `${Configuration.COUNTRIES_BASE_URL}/all?access_key=${Configuration.COUNTRIES_API_KEY}`
    )) as ICountry[];
    if (!countries) {
      throw new Error("Couldn't find countries");
    }
    const countriesList = countries.map(({ name }) => name);
    Cache.put('allCountries', JSON.stringify(countriesList), Configuration.COUNTRIES_LIST_CACHE_DURATION as number);
    return countriesList;
  }
};
