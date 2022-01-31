### Assignment consists of two tasks

1. Create a NodeJs GraphQL server which allows you to look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to SEK. Requests should require a valid JWT obtained from a separate /login endpoint and should be rate limited to 30 requests per minute. Please use the following open APIs for this exercise:

https://restcountries.eu (country lookup and general information)
https://fixer.io (exchange rates) The assignment requires using the free api key that you can obtain by registering an account at fixer.io. but you can feel free to use Atul's key: 65*******************\80d) 2. Create a simple web interface for your NodeJs server using React.js which allows users to:

search and add countries to a list displaying the full country name, population and currency (be mindful of no of requests you make to server)
enter an amount in SEK and get the amount converted into local currency next to each country in the list. Feel free to use any npm packages you like as long as they're OSS, but you need to be able to motivate your choices and we value concise, well structured code with a small footprint
