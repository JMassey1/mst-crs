import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Tooltip } from "react-leaflet/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../../node_modules/leaflet/dist/leaflet.css";
import api from "../api/api";
import { UserContext } from "../contexts/UserAuthContext";
import "../index.css";
import { Room } from "../types/DB_Types";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useDebugLogger } from "../hooks/useDebugLogger";

const getTimes = (start: string, end: string) => {
  const startTime = moment(start, "HH:mm:ss");
  const endTime = moment(end, "HH:mm:ss");

  const times = [];
  while (startTime <= endTime) {
    times.push(startTime.toDate());
    startTime.add(30, "minutes");
  }

  return times;
};

const Reserve: React.FC = () => {
  const params = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room>();
  const { user, isLoggedIn } = useContext(UserContext);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  useDebugLogger(endDate);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (startDate && date && date < startDate) {
      alert("End date must be after start date");
    } else {
      setEndDate(date);
    }
  };

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
          <Row>
            <Col>
              <Card>
                <Card.Header className="fw-semibold mb-3">Reservation Details</Card.Header>
                <Card.Body>
                  <Form>
                    <InputGroup className="mb-3 d-flex justify-content-center">
                      <InputGroup.Text>Name</InputGroup.Text>
                      <Form.Control type="text" value={user.first_name + " " + user.last_name} disabled />
                    </InputGroup>
                    <InputGroup className="d-flex justify-content-center mb-2">
                      <InputGroup.Text style={{ width: "20%" }}>Start Date</InputGroup.Text>
                      <DatePicker
                        showIcon
                        showTimeSelect
                        withPortal
                        showPopperArrow={false}
                        className=""
                        selectsRange={false}
                        selected={startDate}
                        minDate={moment().toDate()}
                        maxDate={moment().add(2, "weeks").toDate()}
                        dateFormat={"MMMM d, h:mm aa"}
                        includeTimes={getTimes(room.building.open_time, room.building.close_time)}
                        onChange={handleStartDateChange}
                        icon={<FaRegCalendarAlt className="mt-1" />}
                        placeholderText="Select Date..."
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setStartDate(null);
                        }}
                      >
                        <MdClear />
                      </Button>
                    </InputGroup>
                    <InputGroup className="d-flex justify-content-center">
                      <InputGroup.Text style={{ width: "20%" }}>End Date</InputGroup.Text>
                      <DatePicker
                        showIcon
                        showTimeSelect
                        withPortal
                        showPopperArrow={false}
                        className=""
                        selectsRange={false}
                        selected={endDate}
                        minDate={moment().toDate()}
                        maxDate={moment().add(2, "weeks").toDate()}
                        dateFormat={"MMMM d, h:mm aa"}
                        includeTimes={getTimes(room.building.open_time, room.building.close_time)}
                        onChange={handleEndDateChange}
                        icon={<FaRegCalendarAlt className="mt-1" />}
                        placeholderText="Select Date..."
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          setEndDate(null);
                        }}
                      >
                        <MdClear />
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Body>
                <Card.Footer className="d-flex flex-row-reverse">
                  <Button variant="outline-primary" disabled={!startDate || !endDate}>
                    Reserve
                  </Button>
                </Card.Footer>
              </Card>
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
