// import React, { useState, useEffect } from "react";
// import { FaFilter } from "react-icons/fa";

// const Filters = ({ onFilterChange }) => {
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   useEffect(() => {
//     onFilterChange(selectedCategory);
//   }, [selectedCategory, onFilterChange]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div className="d-flex align-items-center mb-4">
//       <FaFilter
//         className="me-2"
//         style={{ color: selectedCategory !== "all" ? "#C9851E" : "#ccc" }}
//       />
//       <ul className="list-inline mb-0">
//         <li
//           className="list-inline-item"
//           onClick={() => handleCategoryChange("all")}
//           style={{
//             cursor: "pointer",
//             color: selectedCategory === "all" ? "#C9851E" : "#000",
//           }}
//         >
//           All Products
//         </li>
//         <li
//           className="list-inline-item"
//           onClick={() => handleCategoryChange("categories")}
//           style={{
//             cursor: "pointer",
//             color: selectedCategory === "categories" ? "#C9851E": "#ccc",
//           }}
//         >
//           Categories
//         </li>


//       </ul>
//     </div>
//   );
// };

// export default Filters;
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

const Filters = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    onFilterChange(selectedCategory);
  }, [selectedCategory, onFilterChange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsDrawerOpen(false); // Close drawer after selection
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <FaFilter
          className="me-2"
          style={{ color: selectedCategory !== "all" ? "#C9851E" : "#ccc", cursor: 'pointer' }}
          onClick={toggleDrawer}
        />
        <ul className="list-inline mb-0">
          <li
            className="list-inline-item"
            onClick={() => handleCategoryChange("all")}
            style={{
              cursor: "pointer",
              color: selectedCategory === "all" ? "#C9851E" : "#000",
            }}
          >
            All Products
          </li>
          <li
            className="list-inline-item"
            onClick={() => handleCategoryChange("categories")}
            style={{
              cursor: "pointer",
              color: selectedCategory === "categories" ? "#C9851E" : "#ccc",
            }}
          >
            Categories
          </li>
        </ul>
      </div>

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isDrawerOpen ? 0 : "-300px",
          width: "300px",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "right 0.3s ease",
          zIndex: 1000,
          padding: "20px",
        }}
      >
        <h4>Filter Options</h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li
            style={{
              cursor: "pointer",
              color: selectedCategory === "all" ? "#C9851E" : "#000",
              marginBottom: "10px",
            }}
            onClick={() => handleCategoryChange("all")}
          >
            All Products
          </li>
          <li
            style={{
              cursor: "pointer",
              color: selectedCategory === "categories" ? "#C9851E" : "#000",
              marginBottom: "10px",
            }}
            onClick={() => handleCategoryChange("categories")}
          >
            Categories
          </li>
          <li
            style={{
              cursor: "pointer",
              color: selectedCategory === "electronics" ? "#C9851E" : "#000",
              marginBottom: "10px",
            }}
            onClick={() => handleCategoryChange("electronics")}
          >
            Electronics
          </li>
          <li
            style={{
              cursor: "pointer",
              color: selectedCategory === "fashion" ? "#C9851E" : "#000",
            }}
            onClick={() => handleCategoryChange("fashion")}
          >
            Fashion
          </li>
        </ul>
        <button onClick={toggleDrawer} style={{ marginTop: "20px" }}>
          Close
        </button>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export default Filters;
