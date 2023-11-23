import React from "react";
import { Room } from "../types/DB_Types";
import RoomCard from "./RoomCard";

interface ListProps {
  rooms: Room[];
}

const RoomList: React.FC<ListProps> = ({ rooms }) => {
  return (
    <ul>
      {rooms.map((item, index) => (
        <RoomCard key={index} room={item} />
      ))}
    </ul>
  );
};

export default RoomList;
