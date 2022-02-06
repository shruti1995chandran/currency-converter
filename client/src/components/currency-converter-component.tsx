import React from "react";
import { TEXT_CONST } from "../constants/text-constants";
import "../index.css";
import CurrencyFormFields from "./currency-form-fields";
const CurrencyConverter = () => {
  return (
    <section className="currency-section">
      <h1 className="title"> {TEXT_CONST.currencyCountryProjectTitle}</h1>
      <CurrencyFormFields />
    </section>
  );
};

export default CurrencyConverter;
