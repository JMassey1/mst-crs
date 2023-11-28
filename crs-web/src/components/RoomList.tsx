import React from "react";
import { Room } from "../types/DB_Types";
import RoomCard from "./RoomCard";

interface ListProps {
  rooms: Room[];
}

const RoomList: React.FC<ListProps> = ({ rooms }) => {
  return (
    <>
      {rooms.length > 0 ? (
        <ul style={{ padding: "0px" }}>
          {rooms.map((item, index) => (
            <RoomCard key={index} room={item} />
          ))}
        </ul>
      ) : (
        <p>No rooms found</p>
      )}
    </>
  );
};

export default RoomList;
