import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, NavDropdown, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../contexts/UserAuthContext";

function NavHeader() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, login, logout, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [showModal]);

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
    }
    setUsername("");
    setPassword("");
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
      <Navbar style={{ backgroundColor: "#003B49" }}>
        <Container>
          <Navbar.Brand href="/">
            <img alt="" src="../../mstlogo.png" width="30" height="30" className="d-inline-block align-top" style={{ backgroundColor: "#72BF44" }} />
            <span className="text-white">CAMPUS RESERVATION SYSTEM</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link className="text-white" href="/">
                Home
              </Nav.Link>
              {isLoggedIn() ? (
                <Nav.Link className="text-white" href="/account">
                  My Reservations
                </Nav.Link>
              ) : null}
            </Nav>
            <NavDropdown className="text-white" title="Account" id="basic-nav-dropdown">
              {isLoggedIn() ? (
                <>
                  <NavDropdown.Item>Logged in as: {user.username}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item onClick={handleShowModal}>Login</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
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
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  placeholder="Enter password"
                />
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
      </Navbar>
    </>
  );
}

export default NavHeader;
