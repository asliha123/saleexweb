import React from "react";
import { FaHome, FaShoppingCart, FaLayerGroup, FaChartBar, FaCog } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed-bottom bg-secondary py-3 d-flex justify-content-around">
      <FaHome className="text-warning" size={24} />
      <FaLayerGroup className="text-light" size={24} />
      <FaShoppingCart className="text-light" size={24} />
      <FaChartBar className="text-light" size={24} />
      <FaCog className="text-light" size={24} />
    </footer>
  );
};

export default Footer;
