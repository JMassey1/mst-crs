import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotLoggedIn: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <Container>
      <h1>403 Forbidden</h1>
      <p>Not sure how you got here, but you must be logged in to access this page.</p>
      <p>Redirecting...</p>
      <Spinner animation="border" role="status" />
    </Container>
  );
};

export default NotLoggedIn;
