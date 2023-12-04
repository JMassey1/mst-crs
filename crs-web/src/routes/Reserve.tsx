import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Tooltip } from "react-leaflet/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import "../../node_modules/leaflet/dist/leaflet.css";
import api from "../api/api";
import { UserContext } from "../contexts/UserAuthContext";
import "../index.css";
import { Room } from "../types/DB_Types";

import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

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
  const { user, isLoggedIn, getAuthHeader } = useContext(UserContext);

  const [room, setRoom] = useState<Room>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);

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

  const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(parseInt(event.target.value));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  });

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    const reservation = {
      room_id: params.roomId ? params.roomId : "",
      start_time: moment(startDate).tz("America/Chicago").toISOString(),
      end_time: moment(endDate).tz("America/Chicago").toISOString(),
      num_people: numberOfPeople,
    };

    api.post("api/bookings/create/", reservation, { headers: getAuthHeader() }).then((response) => {
      if (response.status === 201) {
        alert("Reservation successful");
      } else {
        alert("Reservation failed");
      }
    });
  };

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
                <Form onSubmit={handleReserve}>
                  <Card.Body>
                    <InputGroup className="d-flex justify-content-center mb-3">
                      <InputGroup.Text>Registration Holder</InputGroup.Text>
                      <Form.Control type="text" value={user.first_name + " " + user.last_name} disabled />
                    </InputGroup>
                    <InputGroup className="d-flex justify-content-center mb-2">
                      <InputGroup.Text>Number of People</InputGroup.Text>
                      <Form.Control type="number" placeholder="Number of People" value={numberOfPeople} onChange={handlePeopleChange} />
                      <Button variant="outline-secondary" onClick={() => setNumberOfPeople(0)}>
                        <MdClear />
                      </Button>
                    </InputGroup>
                    <hr />
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
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between flex-row-reverse">
                    {!startDate || !endDate || numberOfPeople == 0 ? (
                      <Button variant="outline-secondary" disabled>
                        Reserve
                      </Button>
                    ) : (
                      <Button type="submit" variant="success">
                        Reserve
                      </Button>
                    )}
                    {!startDate && !endDate && numberOfPeople == 0 ? null : (
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setNumberOfPeople(0);
                          setStartDate(null);
                          setEndDate(null);
                        }}
                      >
                        <FaRegTrashCan className="mb-1" />
                      </Button>
                    )}
                  </Card.Footer>
                </Form>
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
