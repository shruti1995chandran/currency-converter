import React from "react";
import { useQuery } from "react-query";
import { Axios } from "./utility/axios";
import Home from "./components/home-component";
import CurrencyConverter from "./components/currency-converter-component";

import "./App.css";

function App() {
  const { isLoading, isError } = useQuery("login", () => Axios.get("login"));

  if (isLoading || isError) {
    return <Home />;
  }
  return (
    <div className="App">
      <CurrencyConverter />
    </div>
  );
}

export default App;
