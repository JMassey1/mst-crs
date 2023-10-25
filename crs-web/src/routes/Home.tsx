import React, { FC } from "react";
import DropdownSelector, {
  DropdownSelectorProps,
} from "../components/DropdownSelector.tsx";

const Home: FC = () => {
  const availDropdown: DropdownSelectorProps = {
    options: ["1-5 people", "6-12 people"],
    placeholder: "Space Availability",
  };
  const floorDropdown: DropdownSelectorProps = {
    options: ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"],
    placeholder: "Floor",
  };
  const buildingDropdown: DropdownSelectorProps = {
    options: [
      "Building 1",
      "Building 2",
      "Building 3",
      "Building 4",
      "Building 5",
    ],
    placeholder: "Building",
  };

  return (
    <div>
      {/* <BuildingButton />
      <AvaSpaces />
      <FloorButton /> */}

      <div className="flex flex-row">
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </div>

      <div className="flex flex-row">
        <DropdownSelector
          options={availDropdown.options}
          placeholder={availDropdown.placeholder}
        />
        <DropdownSelector
          options={floorDropdown.options}
          placeholder={floorDropdown.placeholder}
        />
        <DropdownSelector
          options={buildingDropdown.options}
          placeholder={buildingDropdown.placeholder}
        />
      </div>
    </div>
  );
};

export default Home;
