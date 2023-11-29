import moment from "moment";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { Room } from "../types/DB_Types";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/reserve/${room.id}`;
    navigate(path);
    navigate(0);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="fw-bold">{room.identifier}</Card.Title>
        <Card.Text className="fw-light fw-italic">
          {room.building.name} (
          {moment(room.building.open_time, "HH:mm:ss").format("h:mm a")} -{" "}
          {moment(room.building.close_time, "HH:mm:ss").format("h:mm a")})
        </Card.Text>
        <Card.Text>Maximum Capacity: {`${room.capacity} people`}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-time">
              {selectedTime ? selectedTime : "Select Time"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleTimeSelect("9:00 AM")}>
                9:00 AM
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeSelect("10:00 AM")}>
                10:00 AM
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeSelect("11:00 AM")}>
                11:00 AM
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleTimeSelect("12:00 PM")}>
                12:00 PM
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-duration">
              {selectedDuration ? selectedDuration : "Select Duration"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDurationSelect("1 hour")}>
                1 hour
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDurationSelect("2 hours")}>
                2 hours
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDurationSelect("3 hours")}>
                3 hours
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDurationSelect("4 hours")}>
                4 hours
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Button variant="outline-success" onClick={routeChange}>
          Book Room
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default RoomCard;
