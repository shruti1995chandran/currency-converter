import React from "react";
import { Select } from "antd";
import { ListCountries } from "../graphql/interface";
import { TEXT_CONST } from "../constants/text-constants";
interface MultiSelectDropdownProps {
  selectedVal: string[] | null | undefined;
  items: ListCountries[];
  handleChange: (value: string[]) => void;
}

const { Option } = Select;
export const MultiSelectDropdown = ({
  selectedVal,
  items,
  handleChange,
}: MultiSelectDropdownProps): JSX.Element => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder={TEXT_CONST.countryCodePlaceholder}
      defaultValue={selectedVal}
      onChange={handleChange}
      labelInValue={false}
    >
      {items.map(({ name, currencies }, index) => {
        return (
          <Option key={index} value={name}>
            <div className="demo-option-label-item">
              {name}{" "}
              <span className="currencies">
                ({currencies.map(({ shortName }) => shortName).join(", ")})
              </span>
            </div>
          </Option>
        );
      })}
    </Select>
  );
};
