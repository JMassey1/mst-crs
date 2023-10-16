import React, { useState } from "react";


export const FloorButton = ( ) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-floor-button" onClick={handleOpen}>
                <div className="dropdown-text">
                    <div>Select Floor</div>
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
                            }}
                        >Basement (B)
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                            }}
                        >Ground (G)
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                            }}
                        >First (1st)
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
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