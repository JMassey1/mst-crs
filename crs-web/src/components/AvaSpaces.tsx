import React, { useState } from "react";


export const AvaSpaces = ( ) => {
    const [open, setOpen] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState("Space Availability")
    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSpaceChange = (newRoom: string): void => {
        setSelectedSpace(newRoom);
    }

    return (
        <div className="dropdown">
            <button className="dropdown-ava-button" onClick={handleOpen}>
                <div className="dropdown-text">
                    <div>{ selectedSpace }</div>
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
            {open ? (
                <ul className="menu-ava">
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleSpaceChange("Space Availability");
                            }}
                        >Space Availability
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleSpaceChange("1-5 people");
                            }}
                        >1-5 people
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleSpaceChange("6-12 people");
                            }}
                        >6-12 people
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleSpaceChange("10-20 people");
                            }}
                        >10-20 people
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleSpaceChange("20+ people");
                            }}
                        >20+ people
                        </button>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default AvaSpaces