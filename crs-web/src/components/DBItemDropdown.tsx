import React, { useState } from "react";
import AsyncSelect from "react-select";
import api from "./../api/api.js";

function DBItemDropdown() {
    const[items, setItems] = useState([]);
    const[inputValue, setValue] = useState('');
    const[selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    const fetch = () => {
        return api.get("").then((response) => {
//            const options = [];
//            response.data.forEach((building) => {
//                options.push({
                    //name: building.name,
                    //id: building.id
//                    label: "jeff",
//                    value: 0
//                })
//            });
//            return options;
            const options = result.data;
            return options;
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={selectedValue}
                        getOptionLabel={e => e.name}
                        getOptionValue={e => e.id}
                        loadOptions={fetch}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default DBItemDropdown
