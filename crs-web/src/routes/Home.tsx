import React, { useState } from "react";

import ReservationDropdowns from "../components/ReservationDropdowns";
import { ReservationData } from "../types/Util_Types";

const Home: React.FC = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationData>({
    building: null,
    floor: null,
    capacity: null,
  });

  const handleReservationInfoChange = (
    newReservationInfo: ReservationData
  ): void => {
    setReservationInfo(newReservationInfo);

    console.log(generateFakeRoomData());
  };

  const generateFakeRoomData = () => {
    const { floor, capacity } = reservationInfo;
    const rooms = [];
    for (let i = 1; i <= (capacity?.min ?? 0); i++) {
      const roomNumber = `${floor}${i.toString().padStart(3, "0")}${
        Math.random() < 0.25
          ? String.fromCharCode(65 + Math.floor(Math.random() * 4))
          : ""
      }`;
      rooms.push(roomNumber);
    }
    return rooms;
  };
  return (
    <div>
      <ReservationDropdowns
        onReservationInfoChange={handleReservationInfoChange}
      />
      <div className="mt-3">
        <h4>Rooms to be reserved:</h4>
        <ul>
          {generateFakeRoomData().map((room) => (
            <li key={room}>{room}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
