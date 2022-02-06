import React, { useState } from "react";
import { Col, Row, Divider, Input, Form } from "antd";
import CountriesAddedList from "./country-list-component";
import { CurrencyExchangeInfo, ListCountries } from "../graphql/interface";
import { TEXT_CONST } from "../constants/text-constants";

interface CurrencyCalculationProps {
  currencyDifference: CurrencyExchangeInfo[];
  countriesList: ListCountries[];
}
export const CurrencyCalculation = ({
  countriesList,
  currencyDifference,
}: CurrencyCalculationProps): JSX.Element => {
  const [amount, setAmount] = useState<number>(1);
  return (
    <Row>
      <Col span={24}>
        <Divider orientation="left" orientationMargin="0">
          {TEXT_CONST.conversionRate}
        </Divider>
        <div className="site-input-group-wrapper">
          <Input.Group>
            <Row gutter={20}>
              <Col span={7}>
                <Form.Item label={TEXT_CONST.amountExchange}>
                  <Input
                    type={"number"}
                    prefix={"kr"}
                    suffix={TEXT_CONST.defaultSEK}
                    defaultValue={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </div>
      </Col>
      <Col span={24}>
        <CountriesAddedList
          countriesList={countriesList}
          currencyDifference={currencyDifference}
          amount={amount}
        />
      </Col>
    </Row>
  );
};
