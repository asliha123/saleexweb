
import React, { useState, useEffect } from "react";

const Header = ({ title }) => {
  return (
    <header
      className="d-flex justify-content-between align-items-center p-3  bg-primary text-light"
      style={{ borderBottom: "1px solid #3d3d3d" }}
    >
      <h4 className="m-0" style={{ color: "#C9851E" }}>
        YD Systems | {title}
      </h4>
    </header>
  );
};

export default Header;