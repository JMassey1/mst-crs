import React, { useState } from "react";
import { Col } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import api from "../api/api";
import { Building, Capacity } from "../types/DB_Types";
import { DropdownOption, ReservationData } from "../types/Util_Types";

interface ReservationDropdownsProps {
  onReservationInfoChange: (newReservationInfo: ReservationData) => void;
}

const ReservationDropdowns: React.FC<ReservationDropdownsProps> = ({ onReservationInfoChange }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<DropdownOption<Building> | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<DropdownOption<string> | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<DropdownOption<Capacity> | null>(null);

  const handleBuildingSelect = (option: DropdownOption<Building> | null) => {
    setSelectedBuilding(option);
    onReservationInfoChange({
      building: option?.value || null,
      floor: selectedFloor?.value || null,
      capacity: selectedCapacity?.value || null,
    });
  };

  const handleFloorSelect = (option: DropdownOption<string> | null) => {
    setSelectedFloor(option);
    onReservationInfoChange({
      building: selectedBuilding?.value || null,
      floor: option?.value || null,
      capacity: selectedCapacity?.value || null,
    });
  };

  const handleCapacitySelect = (option: DropdownOption<Capacity> | null) => {
    setSelectedCapacity(option);
    onReservationInfoChange({
      building: selectedBuilding?.value || null,
      floor: selectedFloor?.value || null,
      capacity: option?.value || null,
    });
  };

  const fetchBuildingOptions = (): Promise<DropdownOption<Building>[]> => {
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

  const fetchFloorOptions = (): Promise<DropdownOption<string>[]> => {
    return api.get<string[]>("rooms/floors").then((response) => {
      const options: DropdownOption<string>[] = [];
      response.data.forEach((floor: string) => {
        options.push({
          label: floor,
          value: floor,
        });
      });

      const letters: DropdownOption<string>[] = [];
      const numbers: DropdownOption<string>[] = [];

      options.forEach((option) => {
        if (isNaN(Number(option.value))) {
          letters.push(option);
        } else {
          numbers.push(option);
        }
      });

      return [...letters.sort(), ...numbers.sort().reverse()];
    });
  };

  const fetchCapacityOptions = (): Promise<DropdownOption<Capacity>[]> => {
    return api.get<number[]>("rooms/capacities").then((response) => {
      const capacities: number[] = response.data.sort((a, b) => a - b);
      const options: DropdownOption<Capacity>[] = [
        { label: "1-5 people", value: { min: 1, max: 5 } },
        { label: "6-12 people", value: { min: 6, max: 12 } },
        { label: "13-20 people", value: { min: 13, max: 20 } },
        { label: "20-50 people", value: { min: 20, max: 50 } },
        { label: "50-100 people", value: { min: 50, max: 100 } },
        { label: "100-500 people", value: { min: 100, max: 500 } },
        { label: "500+ people", value: { min: 500 } },
      ];

      // Remove unnecessary options based on capacities
      options.forEach((option, index) => {
        const capacity = option.value;
        if (capacity.min && capacity.max) {
          const isInRange = capacities.some((c) => {
            c >= capacity.min && (!capacity.max || c <= capacity.max);
          });
          if (!isInRange) {
            options.splice(index, 1);
          }
        } else if (capacity.min) {
          const isGreaterThanMin = capacities.some((c) => c >= capacity.min);
          if (!isGreaterThanMin) {
            options.splice(index, 1);
          }
        }
      });
      return options;
    });
  };

  return (
    <div className="d-flex flex-row justify-content-around">
      <Col className="mr-3">
        <AsyncSelect
          key={`unique_dropdown_key_building_${selectedBuilding}`}
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
        <AsyncSelect
          key={`unique_dropdown_key_floor_${selectedFloor}`}
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={selectedFloor}
          loadOptions={fetchFloorOptions}
          onChange={handleFloorSelect}
          isClearable={true}
          placeholder={"Select Floor"}
        />
      </Col>
      <Col className="mx-3">
        <AsyncSelect
          key={`unique_dropdown_key_capacity_${selectedCapacity}`}
          isSearchable={false}
          cacheOptions
          defaultOptions
          value={selectedCapacity}
          loadOptions={fetchCapacityOptions}
          onChange={handleCapacitySelect}
          isClearable={true}
          placeholder={"Select Capacity"}
        />
      </Col>
    </div>
  );
};

export default ReservationDropdowns;
