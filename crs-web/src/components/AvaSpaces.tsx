import React, { useState } from "react";


export const AvaSpaces = ( ) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-ava-button" onClick={handleOpen}>
                <div className="dropdown-text">
                    <div>Space Availability</div>
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
                            }}
                        >1-5 people
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                            }}
                        >6-12 people
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
                            }}
                        >10-20 people
                        </button>
                    </li>
                    <li className="menu-item">
                        <button
                            onClick={() => {
                                handleOpen();
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