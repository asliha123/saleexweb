



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsRequest } from "../redux/slices/productSlice";
// import Filters from "./Filters";

// const ProductCatalogue = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   const [filteredProducts, setFilteredProducts] = useState([]);


//   useEffect(() => {
//     dispatch(fetchProductsRequest());
//   }, [dispatch]);

//   const applyFilters = (selectedCategory) => {
//     let filtered = products;
//     if (selectedCategory === "categories") {
//       filtered = filtered.filter((product) => product.category);
//     }
//     setFilteredProducts(filtered);
//   };


//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container py-4" style={{ minHeight: "100vh" }}>
//       <h4 className=" mb-4" style={{ color: "#C9851E" }}>Product Catalogue</h4>

//       <Filters onFilterChange={applyFilters} />

//       <div className="row g-3">
//         {filteredProducts.map((product) => (
//           <div className="col-sm-6 col-md-4 col-lg-3" key={product.productId}>
//             <div className="card h-100 bg-secondary shadow-sm border-0 rounded-3 text-white">
//               <img
//                 src={product.imageSrc}
//                 className="card-img-top"
//                 alt={product.name}
//                 style={{ objectFit: "cover", height: "200px" }}
                
//               />
//               <div className="card-body">
//                 <h5 className="card-title" style={{ color: "#C9851E" }}>
//                   {product.name}
//                 </h5>
//                 <p className="card-text text-light" style={{ fontSize: "0.9em" }}>
//                   {product.description}
//                 </p>
//                 <p className="card-text text-success fw-bold">${product.price}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCatalogue;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../redux/slices/productSlice";
import Filters from "./Filters";

const ProductCatalogue = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [savedFilters, setSavedFilters] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const applyFilters = (category) => {
    setSelectedCategory(category);
    let filtered = products;

    if (category === "categories") {
      filtered = filtered.filter((product) => product.category);
    }
    setFilteredProducts(filtered);
  };

  const saveFilter = () => {
    if (filterName.trim() === "") return;

    const newFilter = {
      name: filterName,
      category: selectedCategory,
    };
    setSavedFilters([...savedFilters, newFilter]);
    setFilterName("");
  };

  const applySavedFilter = (filter) => {
    applyFilters(filter.category);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4" style={{ minHeight: "100vh" }}>
      <h4 className="mb-4" style={{ color: "#C9851E" }}>Product Catalogue</h4>

      <Filters onFilterChange={applyFilters} />

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter filter name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="form-control w-50"
        />
        <button
          onClick={saveFilter}
          disabled={!filterName.trim()}
          className="btn btn-warning mt-2"
        >
          Save As
        </button>
      </div>

      <h5>Saved Filters:</h5>
      <ul className="list-group mb-4 w-50">
        {savedFilters.map((filter, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action"
            onClick={() => applySavedFilter(filter)}
          >
            {filter.name}
          </li>
        ))}
      </ul>

      <div className="row g-3">
        {filteredProducts.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.productId}>
            <div className="card h-100 bg-secondary shadow-sm border-0 rounded-3 text-white">
              <img
                src={product.imageSrc}
                className="card-img-top"
                alt={product.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#C9851E" }}>
                  {product.name}
                </h5>
                <p className="card-text text-light" style={{ fontSize: "0.9em" }}>
                  {product.description}
                </p>
                <p className="card-text text-success fw-bold">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogue;
