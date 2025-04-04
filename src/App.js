
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "./redux/slices/orderSlice";
import { setToken, clearToken } from "./redux/slices/authSlice"; 
import Header from "./Components/Header";
import VerticalTabs from "./Components/VerticalTabs";
import CatalogueLayout from "./Components/CatalogueLayout";
import Login from "./Components/Login";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); 
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    if (token) {
      dispatch(fetchOrdersRequest()); 
    }
  }, [dispatch, token]);

  const handleLoginSuccess = (userData, token) => {
    dispatch(setToken(token)); 
  };

  const handleLogout = () => {
    dispatch(clearToken()); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return;
      case "Deals":
        return;
      case "Orders":
        return;
      case "Catalogue":
        return <CatalogueLayout />;
      case "Reports":
        return;
      case "Settings":
        return;
      default:
        return;
    }
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-primary text-white min-vh-100" style={{ display: "flex" }}>
      <VerticalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ flex: 1 }}>
        <Header title={activeTab} />
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            background: "#C9851E",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
