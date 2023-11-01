import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import api from "../api/api";
import { Building, Capacity } from "../types/DB_Types";
import { DropdownOption, ReservationData } from "../types/Util_Types";

interface ReservationDropdownsProps {
  onReservationInfoChange: (newReservationInfo: ReservationData) => void;
}

const ReservationDropdowns: React.FC<ReservationDropdownsProps> = ({
  onReservationInfoChange,
}) => {
  const [selectedBuilding, setSelectedBuilding] =
    useState<DropdownOption<Building> | null>(null);
  const [selectedFloor, setSelectedFloor] =
    useState<DropdownOption<number> | null>(null);
  const [, setSelectedCapacity] = useState<DropdownOption<Capacity> | null>(
    null
  );

  const handleBuildingSelect = (option: DropdownOption<Building> | null) => {
    if (option === null) {
      setSelectedBuilding(null);
      setSelectedFloor(null);
      setSelectedCapacity(null);
      onReservationInfoChange({
        building: null,
        floor: null,
        capacity: null,
      });
      return;
    } else {
      setSelectedBuilding(option);
    }
  };

  const handleFloorSelect = (option: DropdownOption<number> | null) => {
    if (option === null) {
      setSelectedFloor(null);
      setSelectedCapacity(null);
      onReservationInfoChange({
        building: selectedBuilding?.value || null,
        floor: null,
        capacity: null,
      });
      return;
    } else {
      setSelectedFloor(option);
    }
  };

  const handleCapacitySelect = (option: DropdownOption<Capacity> | null) => {
    setSelectedCapacity(option);
    onReservationInfoChange({
      building: selectedBuilding?.value || null,
      floor: selectedFloor?.value || null,
      capacity: option?.value || null,
    });
  };

  const fetchBuildingOptions = () => {
    return api.get<Building[]>("buildings").then((response) => {
      const options: DropdownOption<Building>[] = [];
      response.data.forEach((building: Building) => {
        options.push({
          label: building.name,
          value: building,
        });
      });
      return options;
    });
  };

  const getFloorOptions = () => {
    if (selectedBuilding === null) {
      return [];
    }
    const options: DropdownOption<number>[] = [];
    for (let i = 1; i <= selectedBuilding.value?.floors; i++) {
      options.push({
        label: i.toString(),
        value: i,
      });
    }
    return options;
  };

  const getCapacityOptions = () => {
    // TEMPORARY UNTIL WE GET THIS IN DB
    const tempCapacities: Capacity[] = [
      { min: 1, max: 5 },
      { min: 6, max: 12 },
      { min: 10, max: 20 },
      { min: 20, max: null },
    ];
    const options: DropdownOption<Capacity>[] = [];
    tempCapacities.forEach((capacity: Capacity) => {
      options.push({
        label: `${capacity.min}${
          capacity.max ? "-" + capacity.max : "+"
        } people`,
        value: capacity,
      });
    });
    return options;
  };

  return (
    <div className="d-flex flex-row justify-content-around">
      <Col className="mr-3">
        <AsyncSelect
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={selectedBuilding}
          loadOptions={fetchBuildingOptions}
          onChange={handleBuildingSelect}
          isClearable={true}
          placeholder={"Select Building"}
        />
      </Col>
      <Col className="mx-3">
        <Select
          isSearchable={false}
          isDisabled={selectedBuilding === null}
          options={getFloorOptions()}
          onChange={handleFloorSelect}
          isClearable={true}
          placeholder={"Select Floor"}
        />
      </Col>
      <Col className="ml-3">
        <Select
          isSearchable={false}
          isDisabled={selectedFloor === null || selectedBuilding === null}
          options={getCapacityOptions()}
          onChange={handleCapacitySelect}
          isClearable={true}
          placeholder={"Select Capacity"}
        />
      </Col>
    </div>
  );
};

export default ReservationDropdowns;
