import React, { useContext, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { UserContext } from "../contexts/UserAuthContext";

const AuthButton: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login, logout, isLoggedIn } = useContext(UserContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const login_check = await login(username, password);
    setIsLoading(false);
    if (login_check) {
      handleCloseModal();
    } else {
      alert("Login failed, please try again");
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {isLoggedIn() ? (
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="secondary" onClick={handleShowModal}>
          Login
        </Button>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {!isLoading ? (
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Spinner animation="border" />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthButton;
