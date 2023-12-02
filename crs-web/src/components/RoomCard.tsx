import moment from "moment";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserAuthContext";
import { Room } from "../types/DB_Types";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { isLoggedIn } = useContext(UserContext);

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
          {room.building.name} ({moment(room.building.open_time, "HH:mm:ss").format("h:mm a")} - {moment(room.building.close_time, "HH:mm:ss").format("h:mm a")})
        </Card.Text>
        <Card.Text>Maximum Capacity: {`${room.capacity} people`}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        {isLoggedIn() ? (
          <Button variant="outline-success" onClick={routeChange}>
            Book Room
          </Button>
        ) : (
          <Button variant="outline-secondary" disabled>
            Please Login to Book Room
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default RoomCard;
