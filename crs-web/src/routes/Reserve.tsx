import React from "react";

import "../index.css"
import "../../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet"
import api from "../api/api";

const Reserve: React.FC = () => {
    return (
        <div>
            <h1>change this but this is placing reservation page</h1>
            <p>paragraph text</p>
            <div>
                <MapContainer center={[37.95553106464612, -91.77445573055215]} zoom={17}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    );
};

export default Reserve;