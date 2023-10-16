import React, { useState } from "react";


export const BuildingButton = ( ) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
                <button className="dropdown-button" onClick={handleOpen}>
                    <div className="dropdown-text">
                        <div>Select Building</div>
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
                    <ul className="menu">
                        <div>
                        </div>
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
                                >Havener Center
                                </button>
                            </li>
                        <li className="menu-item">
                            <button
                                onClick={() => {
                                    handleOpen();
                                }}
                            >Curtis Law Wilson Library
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                onClick={() => {
                                    handleOpen();
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