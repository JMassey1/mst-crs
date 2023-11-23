import React, { useState } from "react";

import { Spinner } from "react-bootstrap";
import api from "../api/api";
import ReservationDropdowns from "../components/ReservationDropdowns";
import RoomList from "../components/RoomList";
import { Room } from "../types/DB_Types";
import { ReservationData } from "../types/Util_Types";

const Home: React.FC = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationData>({
    building: null,
    floor: null,
    capacity: null,
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(false);

  const handleReservationInfoChange = async (
    newReservationInfo: ReservationData
  ): Promise<void> => {
    setReservationInfo(newReservationInfo);
    if (
      newReservationInfo.building &&
      newReservationInfo.floor &&
      newReservationInfo.capacity
    ) {
      setLoadingRooms(true);
      await fetchRooms();
      setLoadingRooms(false);
    } else {
      setRooms([]);
    }
  };

  const fetchRooms = () => {
    return api
      .get<Room[]>(`rooms/${reservationInfo.building?.id}`)
      .then((response) => {
        if (response.status === 200) {
          setRooms(response.data);
        }
      });
  };

  return (
    <div>
      <h4>Filter Rooms</h4>
      <ReservationDropdowns
        onReservationInfoChange={handleReservationInfoChange}
      />
      <div className="mt-3">
        <h4>Rooms to be reserved:</h4>
        {loadingRooms && <Spinner animation="border" />}
        <RoomList rooms={rooms} />
      </div>
    </div>
  );
};

export default Home;
