import { useState } from "react";
import AsyncSelect from "react-select/async";
import api from "./../api/api";

import { Building } from "../types/DB_Types";

type DBItemDropdownProps = {
  disabled: boolean;
  apiRoute: string;
  placeholderText: string;
  onSelect: (value: Option | null) => void;
};

type Option = {
  label: string;
  value: number;
};

function DBItemDropdown({ disabled, apiRoute, placeholderText, onSelect }: DBItemDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  // handle selection
  const handleChange = (value: Option | null) => {
    onSelect(value);
    setSelectedValue(value);
  };

  const fetch = () => {
    return api.get<Building[]>("api/" + apiRoute).then((response) => {
      const options: Option[] = [];
      response.data.forEach((building: Building) => {
        options.push({
          label: building.name,
          value: building.id,
        });
      });
      return options;
    });
  };

  return <AsyncSelect cacheOptions defaultOptions isDisabled={disabled} value={selectedValue} loadOptions={fetch} onChange={handleChange} isClearable={true} placeholder={placeholderText} />;
}

export default DBItemDropdown;
