
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsRequest } from "../redux/slices/productSlice";
// import { FaTrash, FaSave } from "react-icons/fa";

// const ProductCatalogue = ({
//   saveFilter,
//   selectedSavedFilter,
//   onFiltersCleared,
//   deleteFilter,
// }) => {
//   const dispatch = useDispatch();
//   const { products, appliedFilters } = useSelector((state) => state.products);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterName, setFilterName] = useState("");

//   useEffect(() => {
//     dispatch(fetchProductsRequest());
//   }, [dispatch]);

//   useEffect(() => {
//     setFilteredProducts(products);
//   }, [products]);

//   useEffect(() => {
//     if (selectedSavedFilter) {
//       setFilterName(selectedSavedFilter.name || "");
//     } else {
//       setFilterName("");
//     }
//   }, [selectedSavedFilter, appliedFilters]);

//   useEffect(() => {
//     onFiltersCleared(appliedFilters);
//   }, [appliedFilters, onFiltersCleared]);

//   const handleSaveFilter = () => {
//     if (!filterName.trim() || appliedFilters?.length === 0) return;

//     const newFilter = {
//       name: filterName,
//       filters: appliedFilters,
//     };

//     saveFilter(newFilter);
//   };

//   const handleRemoveFilter = (filterId) => {
//     const newFilters = appliedFilters.filter(
//       (filter) => filter.id !== filterId
//     );
//     dispatch(fetchProductsRequest(newFilters));
//   };

//   const handleDeleteFilter = () => {
//     if (selectedSavedFilter) {
//       deleteFilter(selectedSavedFilter.name);
//     }
//   };

//   const isSaveDisabled = !filterName.trim() || appliedFilters?.length === 0;

//   return (
//     <div className="d-flex bg-primary">
//       <div className="catalogue-container flex-grow-1 p-3">
//         <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
//           {appliedFilters?.length > 0 &&
//             appliedFilters.map((filter) => (
//               <span
//                 key={filter.id}
//                 className="text-white bg-dark-grey px-3 py-1 rounded-pill"
//               >
//                 {filter.name}
//                 <button
//                   onClick={() => handleRemoveFilter(filter.id)}
//                   className="btn btn-sm btn-close ms-2"
//                   aria-label="Close"
//                   style={{ fontSize: "10px", color: "#fff", cursor: "pointer" }}
//                 ></button>
//               </span>
//             ))}

//           <div className="d-flex align-items-center ms-auto" style={{ gap: "10px", minHeight: "36px" }}>
//             <input
//               type="text"
//               value={filterName}
//               onChange={(e) => setFilterName(e.target.value)}
//               className="form-control form-control-sm bg-dark text-white"
//               placeholder="Enter filter name"
//               style={{
//                 background: "#2e2d2d",
//                 color: "white",
//                 border: "1px solid #444",
//                 height: "36px",
//                 padding: "8px 12px",
//                 fontSize: "15px",
//                 boxShadow: "none",
//                 flex: "1",
//               }}
//             />

//             <button
//               onClick={handleSaveFilter}
//               className="btn btn-sm d-flex align-items-center justify-content-center"
//               disabled={isSaveDisabled}
//               style={{
//                 background: "transparent",
//                 color: isSaveDisabled ? "#666" : "#C9851E",
//                 borderRadius: "8px",
//                 padding: "8px",
//                 cursor: isSaveDisabled ? "not-allowed" : "pointer",
//                 fontSize: "16px",
//                 transition: "0.3s",
//                 border: "none",
//                 height: "36px",
//                 width: "40px",

//               }}
//             >
//               <FaSave size={24} color={isSaveDisabled ? "#666" : "#C9851E"} />
//             </button>

//             <button
//               onClick={handleDeleteFilter}
//               className="btn btn-sm d-flex align-items-center justify-content-center"
//               disabled={!selectedSavedFilter}
//               style={{
//                 background: "transparent",
//                 color: "#fff",
//                 borderRadius: "8px",
//                 padding: "8px",
//                 cursor: selectedSavedFilter ? "pointer" : "not-allowed",
//                 fontSize: "16px",
//                 transition: "0.3s",
//                 border: "none",
//                 width: "40px",
//                 height: "36px",

//               }}
//             >
//               <FaTrash size={20} color="#FF5F57" />
//             </button>
//           </div>
//         </div>

//         <hr style={{ borderTop: "2px solid #3d3d3d", margin: "10px 0" }} />

//         <div className="row g-3">
//           {filteredProducts?.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div className="col-sm-6 col-md-4 col-lg-3" key={product.productId}>
//                 <div className="card h-100 bg-dark-grey shadow-sm border-0 rounded-3 text-white">
//                   <img
//                     src={product.imageSrc || "placeholder.jpg"}
//                     className="card-img-top"
//                     alt={product.name}
//                     style={{ objectFit: "cover", height: "200px" }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title text-secondary fw-bold">{product.name}</h5>
//                     <p className="card-text text-white fw-bold">{product.symbol}{product.price}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center w-100">No products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCatalogue;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsRequest } from "../redux/slices/productSlice";
// import { FaTrash, FaSave } from "react-icons/fa";

// const ProductCatalogue = ({
//   saveFilter,
//   selectedSavedFilter,
//   onFiltersCleared,
//   deleteFilter,
// }) => {
//   const dispatch = useDispatch();
//   const { products, appliedFilters } = useSelector((state) => state.products);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterName, setFilterName] = useState("");

//   useEffect(() => {
//     dispatch(fetchProductsRequest());
//   }, [dispatch]);

//   useEffect(() => {
//     setFilteredProducts(products);
//   }, [products]);

//   useEffect(() => {
//     if (selectedSavedFilter) {
//       setFilterName(selectedSavedFilter.name || "");
//     } else {
//       setFilterName("");
//     }
//   }, [selectedSavedFilter, appliedFilters]);

//   useEffect(() => {
//     onFiltersCleared(appliedFilters);
//   }, [appliedFilters, onFiltersCleared]);

//   const handleSaveFilter = () => {
//     if (!filterName.trim() || appliedFilters?.length === 0) return;

//     const newFilter = {
//       name: filterName,
//       filters: appliedFilters,
//     };

//     saveFilter(newFilter);
//   };

//   const handleRemoveFilter = (filterId) => {
//     const newFilters = appliedFilters.filter((filter) => filter.id !== filterId);
//     dispatch(fetchProductsRequest(newFilters));
//   };

//   const handleDeleteFilter = () => {
//     if (selectedSavedFilter) {
//       deleteFilter(selectedSavedFilter.name);
//     }
//   };

//   const handleAddProduct = () => {
//     alert("Add Product Clicked!");
//     // Replace with modal or page transition later
//   };

//   const isSaveDisabled = !filterName.trim() || appliedFilters?.length === 0;

//   return (
//     <div className="d-flex bg-primary">
//       <div className="catalogue-container flex-grow-1 p-3">
//         <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
//           {appliedFilters?.length > 0 &&
//             appliedFilters.map((filter) => (
//               <span
//                 key={filter.id}
//                 className="text-white bg-dark-grey px-3 py-1 rounded-pill"
//               >
//                 {filter.name}
//                 <button
//                   onClick={() => handleRemoveFilter(filter.id)}
//                   className="btn btn-sm btn-close ms-2"
//                   aria-label="Close"
//                   style={{
//                     fontSize: "10px",
//                     color: "#fff",
//                     cursor: "pointer",
//                   }}
//                 ></button>
//               </span>
//             ))}

//           <div
//             className="d-flex align-items-center ms-auto"
//             style={{ gap: "13px", minHeight: "36px" }}
//           >
//             <input
//               type="text"
//               value={filterName}
//               onChange={(e) => setFilterName(e.target.value)}
//               className="form-control form-control-sm bg-dark text-white"
//               placeholder="Enter filter name"
//               style={{
//                 background: "#2e2d2d",
//                 color: "white",
//                 border: "1px solid #444",
//                 height: "36px",
//                 padding: "8px 12px",
//                 fontSize: "15px",
//                 boxShadow: "none",
//                 flex: "1",
//               }}
//             />

//             {/* Save Button */}
//             <button
//               onClick={handleSaveFilter}
//               className="btn btn-sm d-flex align-items-center justify-content-center"
//               disabled={isSaveDisabled}
//               style={{
//                 background: "transparent",
//                 color: isSaveDisabled ? "#666" : "#C9851E",
//                 borderRadius: "8px",
//                 padding: "8px",
//                 cursor: isSaveDisabled ? "not-allowed" : "pointer",
//                 fontSize: "16px",
//                 transition: "0.3s",
//                 border: "none",
//                 height: "36px",
//                 width: "40px",
//               }}
//             >
//               <FaSave size={24} color={isSaveDisabled ? "#666" : "#C9851E"} />
//             </button>

//             {/* Delete Button */}
//             <button
//               onClick={handleDeleteFilter}
//               className="btn btn-sm d-flex align-items-center justify-content-center"
//               disabled={!selectedSavedFilter}
//               style={{
//                 background: "transparent",
//                 color: "#fff",
//                 borderRadius: "8px",
//                 padding: "8px",
//                 cursor: selectedSavedFilter ? "pointer" : "not-allowed",
//                 fontSize: "16px",
//                 transition: "0.3s",
//                 border: "none",
//                 width: "40px",
//                 height: "36px",
//               }}
//             >
//               <FaTrash size={20} color="#FF5F57" />
//             </button>


//             {/* Vertical Divider */}
//             <div
//               style={{
//                 width: "2px",
//                 height: "32px",
//                 backgroundColor: "#C9851E",
//                 borderRadius: "1px",
//                 margin: "0 6px",
//               }}
//             />

//             {/* Add Product Button */}
//             <button
//               onClick={handleAddProduct}
//               className="btn btn-sm d-flex align-items-center justify-content-center"
//               style={{
//                 backgroundColor: "#C9851E",
//                 color: "#fff",
//                 borderRadius: "50%",
//                 padding: "0",
//                 cursor: "pointer",
//                 width: "36px",
//                 height: "36px",
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 lineHeight: "1",
//                 border: "none",
//               }}
//               title="Add New Product"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         <hr style={{ borderTop: "2px solid #3d3d3d", margin: "10px 0" }} />

//         <div className="row g-3">
//           {filteredProducts?.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div
//                 className="col-sm-6 col-md-4 col-lg-3"
//                 key={product.productId}
//               >
//                 <div className="card h-100 bg-dark-grey shadow-sm border-0 rounded-3 text-white">
//                   <img
//                     src={product.imageSrc || "placeholder.jpg"}
//                     className="card-img-top"
//                     alt={product.name}
//                     style={{ objectFit: "cover", height: "200px" }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title text-secondary fw-bold">
//                       {product.name}
//                     </h5>
//                     <p className="card-text text-white fw-bold">
//                       {product.symbol}
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center w-100">No products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCatalogue;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../redux/slices/productSlice";
import { FaTrash, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const ProductCatalogue = ({
  saveFilter,
  selectedSavedFilter,
  onFiltersCleared,
  deleteFilter,
}) => {
  const dispatch = useDispatch();
  const { products, appliedFilters } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterName, setFilterName] = useState("");

  const navigate = useNavigate(); // ✅ Initialize useNavigate hook

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (selectedSavedFilter) {
      setFilterName(selectedSavedFilter.name || "");
    } else {
      setFilterName("");
    }
  }, [selectedSavedFilter, appliedFilters]);

  useEffect(() => {
    onFiltersCleared(appliedFilters);
  }, [appliedFilters, onFiltersCleared]);

  const handleSaveFilter = () => {
    if (!filterName.trim() || appliedFilters?.length === 0) return;

    const newFilter = {
      name: filterName,
      filters: appliedFilters,
    };

    saveFilter(newFilter);
  };

  const handleRemoveFilter = (filterId) => {
    const newFilters = appliedFilters.filter((filter) => filter.id !== filterId);
    dispatch(fetchProductsRequest(newFilters));
  };

  const handleDeleteFilter = () => {
    if (selectedSavedFilter) {
      deleteFilter(selectedSavedFilter.name);
    }
  };

  const handleAddProduct = () => {
    navigate("/add-product"); // ✅ Redirect to /add-product page
  };

  const isSaveDisabled = !filterName.trim() || appliedFilters?.length === 0;

  return (
    <div className="d-flex bg-primary">
      <div className="catalogue-container flex-grow-1 p-3">
        <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
          {appliedFilters?.length > 0 &&
            appliedFilters.map((filter) => (
              <span
                key={filter.id}
                className="text-white bg-dark-grey px-3 py-1 rounded-pill"
              >
                {filter.name}
                <button
                  onClick={() => handleRemoveFilter(filter.id)}
                  className="btn btn-sm btn-close ms-2"
                  aria-label="Close"
                  style={{
                    fontSize: "10px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                ></button>
              </span>
            ))}

          <div
            className="d-flex align-items-center ms-auto"
            style={{ gap: "13px", minHeight: "36px" }}
          >
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="form-control form-control-sm bg-dark text-white"
              placeholder="Enter filter name"
              style={{
                background: "#2e2d2d",
                color: "white",
                border: "1px solid #444",
                height: "36px",
                padding: "8px 12px",
                fontSize: "15px",
                boxShadow: "none",
                flex: "1",
              }}
            />

            {/* Save Button */}
            <button
              onClick={handleSaveFilter}
              className="btn btn-sm d-flex align-items-center justify-content-center"
              disabled={isSaveDisabled}
              style={{
                background: "transparent",
                color: isSaveDisabled ? "#666" : "#C9851E",
                borderRadius: "8px",
                padding: "8px",
                cursor: isSaveDisabled ? "not-allowed" : "pointer",
                fontSize: "16px",
                transition: "0.3s",
                border: "none",
                height: "36px",
                width: "40px",
              }}
            >
              <FaSave size={24} color={isSaveDisabled ? "#666" : "#C9851E"} />
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDeleteFilter}
              className="btn btn-sm d-flex align-items-center justify-content-center"
              disabled={!selectedSavedFilter}
              style={{
                background: "transparent",
                color: "#fff",
                borderRadius: "8px",
                padding: "8px",
                cursor: selectedSavedFilter ? "pointer" : "not-allowed",
                fontSize: "16px",
                transition: "0.3s",
                border: "none",
                width: "40px",
                height: "36px",
              }}
            >
              <FaTrash size={20} color="#FF5F57" />
            </button>

            {/* Vertical Divider */}
            <div
              style={{
                width: "2px",
                height: "32px",
                backgroundColor: "#C9851E",
                borderRadius: "1px",
                margin: "0 6px",
              }}
            />

            {/* Add Product Button */}

            <button
              onClick={handleAddProduct}
              className="btn btn-sm d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#C9851E",
                color: "#fff",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "18px",
                fontWeight: "bold",
                lineHeight: "1",
                border: "none",
                padding: "0",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
              title="Add New Product"
            >
              +
            </button>

          </div>
        </div>

        <hr style={{ borderTop: "2px solid #3d3d3d", margin: "10px 0" }} />

        <div className="row g-3">
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3"
                key={product.productId}
              >
                <div className="card h-100 bg-dark-grey shadow-sm border-0 rounded-3 text-white">
                  <img
                    src={product.imageSrc || "placeholder.jpg"}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-secondary fw-bold">
                      {product.name}
                    </h5>
                    <p className="card-text text-white fw-bold">
                      {product.symbol}
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogue;
