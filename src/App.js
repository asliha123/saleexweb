
// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaPlus } from "react-icons/fa";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import Filters from "./Components/Filters";
// import OrderList from "./Components/OrderList";
// import ProductCatalogue from "./Components/ProductCatalogue";

// const HomePage = () => {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([
//     { id: 1, name: "Sliding Window", image: "https://ydsystems.in/slide-win.jpg" },
//     { id: 2, name: "Casement Window", image: "https://ydsystems.in/casement-1.jpg" },
//   ]);
//   const [filter, setFilter] = useState("All");
//   const [error, setError] = useState(null);

//   // Fetch orders from API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       const url = "https://saleex.in/OrderProcessorApi/OrderProcessor/Orders"; 
//       const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkF1UGc5cDA2UjhrVDNadHdteW1XYXciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3Mzk5MDM3NjEsImV4cCI6MTczOTkxODE2MSwiaXNzIjoiaHR0cHM6Ly9zYWxlZXguaW4vaWRlbnRpdHlzZXJ2ZXIiLCJhdWQiOiJoaXZlVUlDbGllbnQiLCJjbGllbnRfaWQiOiJIaXZlV2ViVUkiLCJzdWIiOiJIaXZlQWRtaW4iLCJhdXRoX3RpbWUiOjE3Mzk5MDM3NjEsImlkcCI6ImxvY2FsIiwiUmVzb3VyY2UiOiJBbGwiLCJSb2xlIjoiMTAxIiwiQmVsb25nc1RvIjoiMTAxIiwiU3ViamVjdCI6IjEwMSIsIkFjY291bnQiOiJIaXZlIENvcnBvcmF0aW9uIiwiTmFtZSI6IkFkbWluIEhpdmUiLCJzY29wZSI6WyJoaXZlVUlDbGllbnQiXSwiYW1yIjpbInB3ZCJdfQ.D1QDRG5sv-seMYSexx8wvnRPNc09BaHVxlX0Tlr69_x8Vdsz58bMIpYYwmNZruuk79TL4FmD57bNnBwdZ4wpAuXPkWRJu2dMwgNg9eorBDcwvw1Hw0_TSczIvjo0Gzx-ADzmuYFCEKDDSFSWKOM3JIyPOBWeqMhZDEspSyhEWpYRrce3HJBGRNg1iTfm6txXZ42a3pcVwsqGADpqE53rPC0bRmYFp0GJA599fKSpQl5BRfR39XLTet5WHwjYX0pAi2wp261TdiHawjF8O0bU4ayze_2naXpJJciGuh61OOKHldVjX5PkJXoepsspwWnv1_a_qeg2MrGsRfqh7NaFVA"; 

//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
           
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: 0,
//             pageNumber: 1,
//             pageSize: 11,
//             periodId: 0,
//             days: 0,
//         "start": "2024-11-10T04:34:14.795Z",
//   "end": "2024-12-27T22:34:14.795Z",
//             isCredit: 0,
//             states: [],
//             clients: [],
//             tags: [],
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const data = await response.json();
//         setOrders(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Add a new order
//   const addNewOrder = () => {
//     const newOrder = {
//       id: orders.length + 1,
//       store: "New Store",
//       items: "New Product - 1",
//       amount: "₹25,000",
//       status: "Pending",
//       date: new Date().toLocaleDateString(),
//       image: "https://ydsystems.in/slide-win.jpg",
//     };
//     setOrders([...orders, newOrder]);
//   };

//   // Add a new product
//   const addNewProduct = () => {
//     const newProduct = {
//       id: products.length + 1,
//       name: "New Product",
//       image: "https://ydsystems.in/casement-1.jpg",
//     };
//     setProducts([...products, newProduct]);
//   };

//   // Filtering orders
//   const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

//   return (
//     <div className="bg-dark text-white min-vh-100 p-4">
//       {/* Header */}
//       <Header />

//       {/* Order Section */}
//       <section className="mt-4">
//         <h2 className="h5 text-light">Recent Orders</h2>
//         <Filters filter={filter} setFilter={setFilter} />
//         {error ? <p className="text-danger">{error}</p> : <OrderList orders={filteredOrders} />}
//       </section>

//       {/* Product Catalogue Section */}
//       <section className="mt-4">
//         <h2 className="h5 text-light">Product Catalogue</h2>
//         <ProductCatalogue products={products} />
//       </section>

//       {/* Add Order & Add Product Buttons */}
//       <div className="container mt-4 pb-5">
//         <div className="d-flex justify-content-center gap-3">
//           <button className="btn btn-warning d-flex align-items-center" onClick={addNewOrder}>
//             <FaPlus className="me-2" /> Add New Order
//           </button>
//           <button className="btn btn-outline-warning d-flex align-items-center" onClick={addNewProduct}>
//             <FaPlus className="me-2" /> Add New Product
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaPlus } from "react-icons/fa";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import Filters from "./Components/Filters";
// import OrderList from "./Components/OrderList";
// import ProductCatalogue from "./Components/ProductCatalogue";

// const HomePage = () => {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//         const fetchOrders = async () => {
//           const url = "https://saleex.in/OrderProcessorApi/OrderProcessor/Orders"; 
//           const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkF1UGc5cDA2UjhrVDNadHdteW1XYXciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3Mzk5MzU2NDEsImV4cCI6MTczOTk1MDA0MSwiaXNzIjoiaHR0cHM6Ly9zYWxlZXguaW4vaWRlbnRpdHlzZXJ2ZXIiLCJhdWQiOiJoaXZlVUlDbGllbnQiLCJjbGllbnRfaWQiOiJIaXZlV2ViVUkiLCJzdWIiOiJIaXZlQWRtaW4iLCJhdXRoX3RpbWUiOjE3Mzk5MzU2NDAsImlkcCI6ImxvY2FsIiwiUmVzb3VyY2UiOiJBbGwiLCJSb2xlIjoiMTAxIiwiQmVsb25nc1RvIjoiMTAxIiwiU3ViamVjdCI6IjEwMSIsIkFjY291bnQiOiJIaXZlIENvcnBvcmF0aW9uIiwiTmFtZSI6IkFkbWluIEhpdmUiLCJzY29wZSI6WyJoaXZlVUlDbGllbnQiXSwiYW1yIjpbInB3ZCJdfQ.tu4L592u4ujttGrXhqO86yw8U9qUmp6bO5mdO4eaTGAyK1y2qhpIHQsp0rN2ektONKwvUJm6LRkeXJpId9Ly7Uu6owMsvAM3rZNIZ7iKrcWOButUW1q5wbBA3J6nfK_55c6TXh5AM4JGp2qZbzlGAUksLXiBmya2v0nXOLNYEaU5VYAY0xhNsg4of6zCWGLJmoU6NvcgtJnL6Wy4x2CFNgsUJEThQXpDRFe-I3Yfy8cPSSYfVbFt1bXna6Y00MAtddK6QIXOx9-gvkPrnVe9XUobp_H1nSRRRyGxqctR5HbugBdzfNl4hTQEl6FEvvNhC03WmPEB8llse1lUFiVCWw"; 
    
//           try {
//             const response = await fetch(url, {
//               method: "POST",
//               headers: {
//                 Authorization: `Bearer ${token}`,
               
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 userId: 0,
//                 pageNumber: 1,
//                 pageSize: 11,
//                 periodId: 0,
//                 days: 0,
//             "start": "2024-11-10T04:34:14.795Z",
//       "end": "2024-12-27T22:34:14.795Z",
//                 isCredit: 0,
//                 states: [],
//                 clients: [],
//                 tags: [],
//               }),
//             });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log("Fetched Orders:", orders); 
//         setOrders(data.response.orders); 
//       } catch (err) {
//         console.error("Failed to fetch orders:", err.message);
//         setError(err.message);
//       }
//     };

//     fetchOrders();
//   }, []);
//   return (
//     <div className="bg-dark text-white min-vh-100 p-4">
//       <Header />

//       <section className="mt-4">
//         <h2 className="h5 text-light">Recent Orders</h2>
//         {/* <Filters filter={filter} setFilter={setFilter} /> */}
//         {error ? <p className="text-danger">{error}</p> : <OrderList orders={orders} />}
//       </section>

//       <section className="mt-4">
//         {/* <h2 className="h5 text-light">Product Catalogue</h2> */}
//         <ProductCatalogue products={products} />
//       </section>

//       <div className="container mt-4 pb-5">
//         <div className="d-flex justify-content-center gap-3">
//           <button className="btn btn-warning d-flex align-items-cente " >
//            <FaPlus className="me-2" /> Add New Order
//           </button>
//           <button className="btn btn-outline-warning d-flex align-items-center"  >
//              <FaPlus className="me-2" /> Add New Product
//            </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default HomePage;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "./redux/slices/orderSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus } from "react-icons/fa";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import OrderList from "./Components/OrderList";
import ProductCatalogue from './Components/ProductCatalogue';

function HomePage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <Header />


      <div>
      <ProductCatalogue />
    </div>
    
      <section className="mt-4">
        {/* <h2 className="h4 mb-4 text-light">Recent Orders</h2> */}
        <h4 className=" mb-4" style={{ color: "#C9851E" }}>Recent Orders</h4>

        {loading && <p>Loading orders...</p>}
        {error ? <p className="text-danger">{error}</p> : <OrderList orders={orders} />}
      </section>

      <div className="container mt-4 pb-5">
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-warning d-flex align-items-center">
            <FaPlus className="me-2" /> Add New Order
          </button>
          <button className="btn btn-outline-warning d-flex align-items-center">
            <FaPlus className="me-2" /> Add New Product
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
