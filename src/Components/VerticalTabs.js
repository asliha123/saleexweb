
import React from "react";
import {
  FaHome,
  FaBox,
  FaBriefcase,
  FaShoppingCart,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const VerticalTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Home", icon: <FaHome /> },
    { name: "Deals", icon: <FaBriefcase /> },
    { name: "Orders", icon: <FaBox /> },
    { name: "Catalogue", icon: <FaShoppingCart /> },
    { name: "Reports", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div style={styles.sidebar}>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          style={{
            ...styles.tabButton,
            background: activeTab === tab.name ? "#3a3a3a" : "transparent",
            color: activeTab === tab.name ? "#fff" : "rgba(255, 255, 255, 0.5)",
          }}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
};

const styles = {
  sidebar: {
    width: "60px",
    background: "#2a2a2a",
    padding: "10px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    boxShadow: "4px 0 10px rgba(0, 0, 0, 0.2)",
  },
  tabButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
    borderRadius: "8px",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    transition: "0.3s",
    outline: "none",
  },
};

export default VerticalTabs;