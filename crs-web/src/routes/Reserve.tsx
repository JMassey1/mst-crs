import React, { useContext, useEffect, useState } from "react";

import { Card, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Tooltip } from "react-leaflet/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../../node_modules/leaflet/dist/leaflet.css";
import api from "../api/api";
import { UserContext } from "../contexts/UserAuthContext";
import "../index.css";
import { Room } from "../types/DB_Types";

const Reserve: React.FC = () => {
  const params = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room>();
  const { user, isLoggedIn } = useContext(UserContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await api.get(`api/rooms/${params.roomId}`);
      if (response.status === 200 && response.data[0].id) {
        setRoom(response.data[0]);
      } else {
        navigate("/404");
      }
    };
    fetchRoom();
  }, [navigate, params.roomId]);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return room && isLoggedIn() ? (
    <>
      <Card className="">
        <Card.Header>Room Reservation</Card.Header>
        <Card.Body style={{ marginBottom: "-15px" }}>
          <Card.Title className="d-flex flex-row">
            <span className="fw-semibold text-capitalize">{room.building.name.toLowerCase()}</span>
          </Card.Title>
          <Card.Subtitle className="d-flex flex-row">
            <span className="fst-italic">Room: {room.identifier.toUpperCase()}</span>
          </Card.Subtitle>
        </Card.Body>
        <hr />
        <Card.Body style={{ marginTop: "-15px" }}>
          <Card.Title className="fw-semibold mb-3">Reservation Details</Card.Title>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="mb-1">First Name</Form.Label>
                  <Form.Control type="text" value={user.first_name} disabled />
                  <Form.Label className="mt-2 mb-1">Last Name</Form.Label>
                  <Form.Control type="text" value={user.last_name} disabled />
                  <Row className="d-flex flex-row">
                    <DatePicker selected={startDate} onChange={handleStartDateChange} showTimeSelect />
                    <DatePicker selected={endDate} onChange={handleEndDateChange} showTimeSelect />
                  </Row>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <MapContainer center={[room.building.longitude, room.building.latitude]} zoom={17}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[room.building.longitude, room.building.latitude]}>
                  <Tooltip direction="bottom" offset={[-15, 30]} permanent>
                    <p className="text-center text-capitalize mb-2">{room.building.name}</p>
                    <p className="text-center fst-italic mb-0">{room.building.address}</p>
                  </Tooltip>
                </Marker>
              </MapContainer>
              <img className="image-padding-top" src={"../src/assets/" + room.building.id + "/" + room.identifier + ".png"} />
              <p>{"floor: " + room.floor + " - room: " + room.identifier + " - building: " + room.building.name}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  ) : null;
};

export default Reserve;
