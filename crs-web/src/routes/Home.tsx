import React, { useEffect, useState } from "react";

import { Spinner } from "react-bootstrap";
import api from "../api/api";
import ReservationDropdowns from "../components/ReservationDropdowns";
import RoomList from "../components/RoomList";
import { Room } from "../types/DB_Types";
import { ReservationData } from "../types/Util_Types";

const isReservationData = (data: ReservationData): boolean => {
  return data.building !== null || data.floor !== null || data.capacity !== null;
};

const Home: React.FC = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationData>({
    building: null,
    floor: null,
    capacity: null,
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(false);

  const handleReservationInfoChange = async (newReservationInfo: ReservationData): Promise<void> => {
    setReservationInfo(newReservationInfo);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      if (!reservationInfo.building && !reservationInfo.floor && !reservationInfo.capacity) {
        setRooms([]);
        return;
      }

      setLoadingRooms(true);
      try {
        let requestBody = {};

        if (reservationInfo.building) {
          requestBody = { ...requestBody, building_id: reservationInfo.building.id };
        }

        if (reservationInfo.floor) {
          requestBody = { ...requestBody, floor: reservationInfo.floor };
        }

        if (reservationInfo.capacity) {
          if (reservationInfo.capacity.max) {
            requestBody = { ...requestBody, min_capacity: reservationInfo.capacity.min, max_capacity: reservationInfo.capacity.max };
          } else {
            requestBody = { ...requestBody, min_capacity: reservationInfo.capacity.min };
          }
        }

        const response = await api.post<Room[]>(`api/rooms/search/`, requestBody);
        if (response.status === 200) {
          setRooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, [reservationInfo]);

  return (
    <>
      <h4>Filter Rooms</h4>
      <ReservationDropdowns onReservationInfoChange={handleReservationInfoChange} />
      <div className="mt-3">
        <h4>Rooms to be reserved:</h4>
        {loadingRooms && <Spinner animation="border" />}
        {isReservationData(reservationInfo) ? <RoomList rooms={rooms} /> : <p>Please select a building, floor, and/or capacity to search for rooms.</p>}
      </div>
    </>
  );
};

export default Home;
