import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import api from "./../api/api";

import { Building } from "../types/DB_Types";

function DBItemDropdown() {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = (value: any) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  const fetch = () => {
    return api.get("buildings").then((response) => {
      const options: any[] = [];
      response.data.forEach((building: Building) => {
        options.push({
          label: building.name,
          value: building.id,
        });
      });
      return options;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedValue}
            loadOptions={fetch}
            onInputChange={handleInputChange}
            onChange={handleChange}
            isClearable={true}
          />
        </div>
      </div>
    </div>
  );
}

export default DBItemDropdown;
