import React, { useState, useEffect } from "react";


export const BuildingButton = ( ) => {
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState("Select Building")

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleRoomChange = (newRoom: string): void => {
        setSelectedRoom(newRoom);
    }

    return (
            <div className="dropdown">
                <button className="dropdown-building-button" onClick={handleOpen}>
                    <div className="dropdown-text">
                        <div>{ selectedRoom }</div>
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
                    <ul className="menu-building">
                        <li className="menu-item">
                            <button
                                onClick={() => {
                                    handleOpen();
                                    handleRoomChange("Select Building");
                                }}
                            >Select Building
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                onClick={() => {
                                    handleOpen();
                                    handleRoomChange("Computer Science");
                                }}
                            >Computer Science
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                onClick={() => {
                                    handleOpen();
                                    handleRoomChange("Havener Center");
                                }}
                            >Havener Center
                            </button>
                        </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleRoomChange("Curtis Law Wilson Library");
                            }}
                        >Curtis Law Wilson Library
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleRoomChange("Humanities and Social Science");
                            }}
                        >Humanities and Social Science
                        </button>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default BuildingButton