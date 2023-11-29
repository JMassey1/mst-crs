import React, { useEffect, useState } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Tooltip } from "react-leaflet/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../../node_modules/leaflet/dist/leaflet.css";
import api from "../api/api";
import "../index.css";
import { Room } from "../types/DB_Types";

const Reserve: React.FC = () => {
  const params = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await api.get(`rooms/${params.roomId}`);
      if (response.status === 200 && response.data[0].id) {
        setRoom(response.data[0]);
      } else {
        navigate("/404");
      }
    };
    fetchRoom();
  }, [navigate, params.roomId]);

  return (
    <>
      <h4>Place Reservation</h4>
      <div className="two-columns">
        <div className="left-column">
          <p>{room?.identifier}</p>
        </div>
        {room ? (
          <div className="right-column">
            <MapContainer center={[room.building.longitude, room.building.latitude]} zoom={17}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[room.building.longitude, room.building.latitude]}>
                <Tooltip direction="bottom" offset={[-15, 30]} permanent>
                  <p className="text-center text-capitalize mb-2">{room.building.name}</p>
                  <p className="text-center fst-italic mb-0">{room.building.address}</p>
                </Tooltip>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <p>Error finding Room</p>
        )}
      </div>
    </>
  );
};

export default Reserve;
