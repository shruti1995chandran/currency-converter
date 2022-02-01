export class Configuration {
  public static PORT = process.env.PORT || 8002;
  public static FIXER_API_KEY = process.env.FIXERR_API_KEY || '65a46a3c3c9c4a87ab07b6a72500b80d';
  public static JWT_SECRET = process.env.JWT_SECRET || 'secret';
  public static JWT_EXPIRY = process.env.JWT_EXPIRY || 60 * 60;
  public static REACT_APP_URL = process.env.REACT_APP_URL || 'http://localhost:3000';
  public static FIXER_BASE_URL = process.env.FIXER_BASE_URL || 'http://data.fixer.io/api/latest';
  public static COUNTRIES_BASE_URL = process.env.COUNTRIES_BASE_URL || 'http://restcountries.eu/rest/v2';
  public static RATE_LIMIT = process.env.RATE_LIMIT || 60 * 1000;
  public static RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 5;
  public static COUNTRIES_API_KEY = process.env.COUNTRIES_API_KEY || '6a5ac5a665f9018ee500bd2fd62289ae';
  public static COUNTRIES_LIST_CACHE_DURATION = process.env.COUNTRIES_LIST_CACHE_DURATION || 24 * 60 * 60 * 1000; // NOTE Duration for one day
}
