
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "./redux/slices/orderSlice";
import Header from "./Components/Header";
import VerticalTabs from "./Components/VerticalTabs";
import CatalogueLayout from "./Components/CatalogueLayout";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import { Routes, Route, useNavigate } from "react-router-dom";
const HomePage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [activeTab, setActiveTab] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrdersRequest());
    }
  }, [dispatch, isLoggedIn]);

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return null;
      case "Deals":
        return null;
      case "Orders":
        return null;
      case "Catalogue":
        return (
          <CatalogueLayout
            onAddProduct={() => setActiveTab("AddProduct")} 
          />
        );
      case "AddProduct":
        return <AddProduct onBack={() => setActiveTab("Catalogue")} />; 
      case "Reports":
        return null;
      case "Settings":
        return null;
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
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
        <Routes>
          <Route path="/" element={renderContent()} /> {/* Default home route */}
          <Route path="/catalogue" element={<CatalogueLayout />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>  
       
      </div>
    </div>
  );
};

export default HomePage;
