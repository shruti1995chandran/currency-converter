import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SERVER_URL } from "./utility/config";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
