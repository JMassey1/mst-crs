import React, { useContext, useEffect, useState } from "react";

import { Card, Col, Form, Row } from "react-bootstrap";
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

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/home");
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

  return room ? (
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
          <Card.Title className="fw-medium">Reservation Details</Card.Title>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" />
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
