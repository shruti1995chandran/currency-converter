export class Configuration {
  public static PORT = process.env.PORT || 8002;
  public static FIXER_API_KEY = process.env.FIXERR_API_KEY || '4ccc71cc84329b0c7c8462f88b2d082a';
  public static JWT_SECRET = process.env.JWT_SECRET || 'secret';
  public static JWT_EXPIRY = process.env.JWT_EXPIRY || 60 * 60;
  public static REACT_APP_URL = process.env.REACT_APP_URL || 'http://localhost:3000';
  public static FIXER_BASE_URL = process.env.FIXER_BASE_URL || 'http://data.fixer.io/api/latest';
  public static COUNTRIES_BASE_URL = process.env.COUNTRIES_BASE_URL || 'https://restcountries.com/v3.1';
  public static REQUEST_LIMIT_TIMER = process.env.RATE_LIMIT || 60 * 1000;
  public static REQUEST_LIMIT_MAX_COUNT = process.env.RATE_LIMIT_MAX || 30;
  public static COUNTRIES_API_KEY = process.env.COUNTRIES_API_KEY || '6a5ac5a665f9018ee500bd2fd62289ae';
  public static COUNTRIES_LIST_CACHE_DURATION = process.env.COUNTRIES_LIST_CACHE_DURATION || 24 * 60 * 60 * 1000; // NOTE Duration for one day
  public static STATIC_CURRENCY_CONVERSION = process.env.STATIC_CURRENCY_CONVERSION || 'SEK';
}
