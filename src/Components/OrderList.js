
import React from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const OrderList = ({ orders }) => {
  console.log(orders);
  
  return (
    <div className="container mt-4">
      <div className="row g-3">
      {orders.length > 0 ? (
  orders.map((order) => {
    console.log(order); 

    return (
      <div key={order.orderId} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card bg-secondary text-white p-3 h-100">

          {/* Store Name & Date */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="text-warning mb-0">{order.clientName || "Unknown"}</h6>
            <span className="text-light small">
              {/* {order.date ? new Date(order.updatedOn).toLocaleDateString() : "N/A"} */}
            </span>
          </div>

          {/* Product Image */}
          {/* <img 
            src={order.image || "https://via.placeholder.com/150"} 
            alt="Product" 
            className="rounded my-2 w-100" 
            style={{ height: "150px", objectFit: "contain" }} 
          /> */}

          {/* Items */}
          <p className="small text-light">{order.summary || "No items listed"}</p>



          {/* Status & Price */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="fw-bold text-warning mb-0">{order.symbol} {order.balance || "0"}</p>

            <span className={`badge ${
              order.status === "Completed" ? "bg-success" :
              order.status === "Pending" ? "bg-warning text-dark" :
              "bg-danger"
            }`}>
              {order.orderStatus}
            </span>
          </div>
        </div>
      </div>
    );
  })
) : (
  <div className="text-center text-muted w-100 mt-3">No orders found</div>
)}

      </div>
    </div>
  );
};

export default OrderList;

