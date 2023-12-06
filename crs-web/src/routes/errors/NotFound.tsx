import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button className="me-3" variant="outline-danger" onClick={() => navigate("/")}>
        Return to Home
      </Button>
      <Button className="ms-3" variant="outline-secondary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
