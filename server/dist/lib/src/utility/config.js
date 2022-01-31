"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    static PORT = process.env.PORT || 4000;
    static FIXER_API_KEY = process.env.FIXERR_API_KEY || "65a46a3c3c9c4a87ab07b6a72500b80d";
    static JWT_SECRET = process.env.JWT_SECRET || "secret";
    static JWT_EXPIRY = process.env.JWT_EXPIRY || 60 * 60;
    static REACT_APP_URL = process.env.REACT_APP_URL || "http://localhost:3001";
    static FIXER_BASE_URL = process.env.FIXER_BASE_URL || "http://data.fixer.io/api/latest";
    static COUNTRIES_BASE_URL = process.env.COUNTRIES_BASE_URL || "http://restcountries.eu/rest/v2";
    static RATE_LIMIT = process.env.RATE_LIMIT || 60 * 1000;
    static RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 5;
}
exports.Configuration = Configuration;
//# sourceMappingURL=config.js.map