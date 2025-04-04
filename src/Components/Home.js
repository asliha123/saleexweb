// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user) {
//       navigate("/login"); // Redirect if not logged in
//     }
//   }, [navigate, user]);

//   return (
//     <div>
//       <h1>Welcome to Home Page</h1>
//       <p>You're logged in as {user?.email}</p>
//     </div>
//   );
// };

// export default Home;
