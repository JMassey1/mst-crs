import React from "react";

const NewNavbar = () => {
  // #003B49 - Blue
  // #72BF44 - Green (Logo)
  return (
    <nav
      style={{
        backgroundColor: "#003B49",
        height: "50px",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      <p style={{ color: "red" }}>Test</p>
    </nav>
  );
};

export default NewNavbar;
