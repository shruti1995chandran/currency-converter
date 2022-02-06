import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { CurrencyExchangeInfo, ListCountries } from "../graphql/interface";

const colors = [
  "geekblue",
  "magenta",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const getRandomColorForTag = (): string => {
  const color = Math.floor(Math.random() * colors.length);
  return colors[color];
};
const columns = [
  {
    title: "Country Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Conversion-Rate",
    dataIndex: "currencies",
    key: "currencies",
    render: (currencies: CurrencyWithMultiplier[]) => (
      <>
        {currencies.map(({ name, symbol, multiplier, currencyColor }) => {
          return (
            <Tooltip
              placement="topLeft"
              key={name}
              title={multiplier.toFixed(2) + " approx. " + name}
              arrowPointAtCenter
            >
              <Tag color={currencyColor}>
                {multiplier} {symbol}
              </Tag>
            </Tooltip>
          );
        })}
      </>
    ),
  },
];

interface CountriesAddedListProps {
  currencyDifference: CurrencyExchangeInfo[];
  countriesList: ListCountries[];
  amount: number;
}

interface Row extends Omit<ListCountries, "currencies"> {
  key: string;
  currencies: CurrencyWithMultiplier[];
}
interface CurrencyWithMultiplier {
  name: string;
  symbol: string;
  multiplier: number;
  currencyColor: string;
}
const CountriesAddedList = ({
  countriesList,
  currencyDifference,
  amount,
}: CountriesAddedListProps): JSX.Element => {
  const currencyDifferenceMapper = new Map<string, number>();
  if (currencyDifference && currencyDifference.length != 0) {
    for (const {
      exchangeRateFrom,
      exchangeRateToMultiplier,
    } of currencyDifference) {
      currencyDifferenceMapper.set(exchangeRateFrom, exchangeRateToMultiplier);
    }
  }

  const data = countriesList.map<Row>(({ name, population, currencies }) => ({
    key: name,
    name,
    population,
    currencies: currencies.map(({ shortName, symbol, name }) => ({
      symbol,
      multiplier: amount * (currencyDifferenceMapper.get(shortName) ?? 0),
      name,
      currencyColor: getRandomColorForTag(),
    })),
  }));
  return <Table key={"1"} columns={columns} dataSource={data} />;
};

export default CountriesAddedList;
