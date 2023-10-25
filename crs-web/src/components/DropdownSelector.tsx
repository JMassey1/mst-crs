import React, { useState } from "react";

export interface DropdownSelectorProps {
  options: string[];
  placeholder: string;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  options,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setActiveSelection(option);
  };
  const handleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-building-button" onClick={handleDropdown}>
        <div className="dropdown-text">
          <div>{activeSelection || placeholder}</div>
          <div
            className="material-icons"
            style={{
              transform: `rotate(${open ? 180 : 0}deg)`,
              transition: "all 0.25s",
            }}
          >
            expand_more
          </div>
        </div>
      </button>
      {open && (
        <ul className="menu-building">
          {options.map((option) => (
            <li
              className="menu-item"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default DropdownSelector;
