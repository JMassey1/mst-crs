import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Nav() {
  return (
    <>
      <Navbar style={{ backgroundColor: "#003B49" }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="../../mstlogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ backgroundColor: "#72BF44" }}
            />{" "}
            <span className="text-white">CAMPUS RESERVATION SYSTEM</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
