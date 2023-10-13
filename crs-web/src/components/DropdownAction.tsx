import React, { useState } from "react";

export const DropdownAction = ( ) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-building-button" onClick={handleOpen}>
                <div className="dropdown-text">
                    <div>Select Building</div>
                        <div
                            className="material-icons"
                            style={{
                                transform: `rotate(x${open ? 180 : 0}deg)`,
                                transition: "all 0.25s",
                            }}
                        >
                            expand_more
                        </div>
                    </div>
                </button>
                {open ? (
                    <ul className="building-menu">
                            <li className="menu-item">
                                <button
                                    onClick={() => {
                                        handleOpen();
                                    }}
                                >Computer Science
                                </button>
                            </li>
                            <li className="menu-item">
                                <button
                                    onClick={() => {
                                        handleOpen();
                                    }}
                                >Humanities
                                </button>
                            </li>
                    </ul>
                ) : null}
            </div>
    );
};