/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row, Spinner, Stack } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { UserContext } from "../contexts/UserAuthContext";
import { useAuthRequired } from "../hooks/useAuthRequired";
import { Booking } from "../types/DB_Types";

const handleCancelReservation = (id: number, authHeader: { Authorization: string }): boolean => {
  const cancelToast = toast.loading("Cancelling reservation...", { autoClose: false });
  api
    .put(`api/bookings/${id}/cancel/`, {}, { headers: authHeader })
    .then((response) => {
      if (response.status === 204) {
        toast.update(cancelToast, { render: "Reservation cancelled!", type: "success", isLoading: false, autoClose: 1500 });
        return true;
      } else {
        toast.update(cancelToast, { render: "Failed to cancel reservation", type: "error", isLoading: false, autoClose: 1500 });
        return false;
      }
    })
    .catch(() => {
      toast.update(cancelToast, { render: "Failed to cancel reservation", type: "error", isLoading: false, autoClose: 1500 });
      return false;
    });

  return false;
};

const AccountPage: React.FC = () => {
  const { user, getAuthHeader } = useContext(UserContext);
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useAuthRequired(navigate);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    setIsFetching(true);
    api
      .get("api/bookings/mine", { headers: getAuthHeader() })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          setReservations(response.data);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch reservations");
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmCancel = (id: number) => {
    handleCancelReservation(id, getAuthHeader());
    setReservations(reservations.filter((reservation) => reservation.id !== id));
    handleCloseModal();
  };

  return (
    <>
      <Container className="text-center">
        <h1>Welcome, {`${user.first_name} ${user.last_name}`}!</h1>
        <hr />
        <Card>
          <Card.Header>
            <Card.Title className="text-center">Your Reservations</Card.Title>
          </Card.Header>
          {isFetching ? (
            <Spinner animation="border" />
          ) : reservations.length === 0 ? (
            <p>You have no Reservations!</p>
          ) : (
            <Stack className="cold-md-5 mx-auto" gap={2}>
              {reservations.map((reservation, index) => (
                <Card key={index}>
                  <Row>
                    <Col>
                      <Card.Body>
                        <Card.Title>{reservation.room.building.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Room: {reservation.room.identifier}</Card.Subtitle>
                        <Card.Text>
                          <Container className="d-flex flex-row border border-2 rounded-pill flex-nowrap mx-1 mb-2">
                            <FaRegCalendarAlt className="mt-1 me-2" />
                            <span>{moment(reservation.start_date).format("MMM Do, h:mm a")}</span>
                            <span className="mx-2">-</span>
                            <span>{moment(reservation.end_date).format("MMM Do, h:mm a")}</span>
                          </Container>
                          <Button variant="outline-danger" onClick={handleShowModal}>
                            Cancel
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>

                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to cancel this reservation?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        No
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleConfirmCancel(reservation.id);
                        }}
                      >
                        Yes, Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card>
              ))}
            </Stack>
          )}
        </Card>
      </Container>
    </>
  );
};

export default AccountPage;
