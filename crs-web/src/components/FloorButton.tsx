import React, { useState } from "react";


export const FloorButton = ( ) => {
    const [open, setOpen] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState("Select Floor")
    const handleOpen = () => {
        setOpen(!open);
    };

    const handleFloorChange = (newRoom: string): void => {
        setSelectedFloor(newRoom);
    }

    return (
        <div className="dropdown">
            <button className="dropdown-floor-button" onClick={handleOpen}>
                <div className="dropdown-text">
                    <div> {selectedFloor} </div>
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
                <ul className="menu-floor">
                    <div>
                    </div>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleFloorChange("Select Floor");
                            }}
                        >Select Floor
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleFloorChange("Basement (B)");
                            }}
                        >Basement (B)
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleFloorChange("Ground (G)");
                            }}
                        >Ground (G)
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleFloorChange("First (1st)");
                            }}
                        >First (1st)
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                                handleFloorChange("Second (2nd)");
                            }}
                        >Second (2nd)
                        </button>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default FloorButton