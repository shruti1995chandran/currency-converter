import React, { useState } from "react";
import { Row, Divider, Col, Button, message } from "antd";
import "../index.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { TEXT_CONST } from "../constants/text-constants";
import { listCountries, exchangeRates } from "../graphql";
import { ListCountries, CurrencyExchangeInfo } from "../graphql/interface";
import { onError } from "../utility/error";
import { MultiSelectDropdown } from "./multi-selection-dropdown";
import { CurrencyCalculation } from "./currency-calculation";

const CurrencyFormFields = () => {
  const [field, setField] = useState<string[]>([]);
  const [countryCurrency, setCountryCurrency] = useState<string[]>([]);
  const [getCurrencyRates, { data: currencyDifference }] = useLazyQuery<{
    exchangeRatesAsPerCurrency: CurrencyExchangeInfo[];
  }>(exchangeRates, {
    onError,
  });
  const { data, loading } = useQuery<{ listCountries: ListCountries[] }>(
    listCountries,
    {
      onError,
    }
  );

  if (loading) {
    return <div>{TEXT_CONST.isLoading}</div>;
  }

  const getAllCountriesList = (): string[] => {
    const currencies = data?.listCountries
      .filter(({ name }) => field.includes(name))
      .map(({ currencies }) => currencies.map(({ shortName }) => shortName))
      .flat();
    // NOTE- FREE version only supports EURO
    if (!currencies || currencies?.every((currency) => currency !== "EUR")) {
      message.error("Free version only supports Euro for currency");
      return [];
    }
    return currencies;
  };
  const fetchCoversionRate = (): void => {
    const listOfCurrencies = getAllCountriesList();
    if (listOfCurrencies.length > 0) {
      setCountryCurrency(listOfCurrencies);
      getCurrencyRates({ variables: { currencyShortName: listOfCurrencies } });
    }
  };

  const handleChange = (value: string[]) => {
    setField(value);
  };
  return (
    <Row gutter={[16, 48]}>
      <Col span={24}>
        <Divider orientation="left" orientationMargin="0">
          {TEXT_CONST.countryCode}
        </Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={20}>
            <MultiSelectDropdown
              handleChange={handleChange}
              items={data?.listCountries ?? []}
              selectedVal={field}
            />
          </Col>
          <Col className="gutter-row" span={4}>
            <Button
              type="primary"
              className="fetch-conversation-rate"
              disabled={!field || field.length === 0}
              onClick={() => {
                if (field.length === 0) {
                  message.error("Please select a country");
                  return;
                }
                fetchCoversionRate();
              }}
            >
              {TEXT_CONST.fetchConversionRate}
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {field &&
          field.length > 0 &&
          countryCurrency.length > 0 &&
          currencyDifference && (
            <CurrencyCalculation
              currencyDifference={
                currencyDifference
                  ? currencyDifference.exchangeRatesAsPerCurrency
                  : []
              }
              countriesList={
                data?.listCountries.filter(({ name }) =>
                  field.includes(name)
                ) ?? []
              }
            />
          )}
      </Col>
    </Row>
  );
};

export default CurrencyFormFields;
