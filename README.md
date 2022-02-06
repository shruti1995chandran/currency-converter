# Countries Exchange Rates

1. Create a NodeJs GraphQL server which allows you to look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to SEK. Requests should require a valid JWT obtained from a separate /login endpoint and should be rate limited to 30 requests per minute. Please use the following open APIs for this exercise:

> https://restcountries.eu (country lookup and general information)

> https://fixer.io (exchange rates)

2. Create a simple web interface for your NodeJs server using React.js which allows users to:

search and add countries to a list displaying the full country name, population and currency (be mindful of no of requests you make to server)
enter an amount in SEK and get the amount converted into local currency next to each country

---

### Technology Used

- React (Frontend)
- Node (Backend)

### Packages Used

- React (create-react-template)

  - Apollo/Client
    - It is used for integrating the graphql queries hook and using it efficiently
  - React-query
    - It is used for using the `useQuery` and other features (Future iteration)
  - Axios
    - It is used to make api calls other than graphql
  - Antd
    - It is used for getting pre-defined components
  - Typescript
    - It is used for safely typed components

- Node
  - Axios
    - It is used to make api calls to third party
  - Cache
    - It is used to cache request for fixer.io response
  - Cors
    - It is used to enable cross domain requests
  - Jest
    - It is used for test cases
  - Supertest
    - It is used for api test cases
  - Graphql
    - It is used for integrating graphql in server
  - Apollo server express
    - It is used for creating graphql server with express seamlessly
  - Jsonwebtoken
    - It is used for creating JWT
  - Express Request limit
    - It is used for adding request limiting capability for apis
  - Cookie parser
    - It is used for reading cookies from headers
  - ESLINT
    - It is used for enabling linting
  - Prettier
    - It is used for code styling and identation

---

#### Pre-requisite for running the project

- Set the environment variable as follows in the `.env` or `config/index.ts`

```.env
#########################FRONTEND######################
#config location <rootDir>/client/src/config/index.ts

# URL for the API server
API_SERVER=http://localhost:8002


#########################BACKEND#######################
#config location <rootDir>/server/lib/src/config/index.ts

# PORT to use for running the node-server
PORT=8002
# FIXER API key
FIXER_API_KEY=<FIXER_API_KEY>

# Request-limit time window in milliseconds
REQUEST_LIMIT_TIMER=60000

# Rate-limit counter to allow user to hit the api's only for certain number of time within the window
REQUEST_LIMIT_MAX_COUNT=30

# JWT Secret will be used to create JWT for validating the request
JWT_SECRET=secret

# JWT EXPIRY will be expiration time in seconds
JWT_EXPIRY=3600

# React app url will be used to allow the client to use the api without getting the CORS error
REACT_APP_URL=http://localhost:3000

# FIXER_BASE_URL
FIXER_BASE_URL=http://data.fixer.io/api/latest

# COUNTRIES_BASE_URL
COUNTRIES_BASE_URL=https://restcountries.com/v3.1

# COUNTRIES_API_KEY
COUNTRIES_API_KEY=<Rest country api key>

# COUNTRIES_LIST_CACHE_DURATION will be used to cache allcountries for a timeperiod provided in millisecond
COUNTRIES_LIST_CACHE_DURATION=3600000
```

Running the project

- React (PORT 3000)

  - Run `cd client`
  - Run `npm install`
  - Run `npm start`

- Server (PORT 8002)
  - Run `cd server`
  - Run `npm install`
  - Run `npm start`

---

### Future improvements

#### **BACKEND**

- DATABASE

  - Add database for storing the user information, then we can have proper username/password authentication in place

- CACHING

  - Use Dedicated Redis cluster instead of memory cache as it will be difficult to use cache in a distributed system
  - We can introduce some caching mechanism on allCountries Resolver and store some information which we believe won't change that frequently.

- REQUEST-LIMITING

  - We can introduce userId and IP for rate-limiting and it will enhance the security and user experience, suppose user uses our website from different devices.

- ERROR-HANDLING
  - Introduce some error handling mechanism for tracking the errors within the APP

#### **FROTEND**

- UI
  - Currently UI is not mobile friendly
  - We can add some icons for countries and currencies for more interactive experience
- Test cases
  - We can add some test cases in Frontend for validating the business logic
- Adding login screen and using proper authentication method

#### **AUTOMATION**

- Adding Cypress test cases

#### CI/CD

- Adding github action or any other CI/CD tool to verify linting, prettier and test cases.

#### DEPLOYMENT

- Adding support to docker and kubernetes for the making the app more scalable reasonably
