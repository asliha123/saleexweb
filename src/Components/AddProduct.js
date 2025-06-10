

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonList from "./CommonList";

const AddProduct = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const [showBrandList, setShowBrandList] = useState(false);
  const [showLocationList, setShowLocationList] = useState(false);
  const [showSizeList, setShowSizeList] = useState(false);
  const [showTagList, setShowTagList] = useState(false);
  const [showUnitList, setShowUnitList] = useState(false);
  const [showTaxList, setShowTaxList] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTax, setSelectedTax] = useState(null);
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [units, setUnits] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    quantity: 0,
    unit: "",
    price: 0,
    tax: 0,
    purchasePrice: 0,
    discount: 0,
    brandId: null,
    locationIds: [],
    sizeId: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);
  
 
  
  useEffect(() => {
    if (token) {
      console.log("Token iss ready, starting data fetching...");
      fetchData("https://laptop-9efu9o2s/catalogueserver/Configuration/Brands", setBrands);
      fetchData("https://laptop-9efu9o2s/identityserver/Accounts/Locations", setLocations);
      fetchData("https://laptop-9efu9o2s/catalogueserver/Configuration/Sizes", setSizes);
      fetchData("https://laptop-9efu9o2s/catalogueserver/Configuration/Tags", setTags);
      fetchData("https://laptop-9efu9o2s/identityserver/Config/ProductUnits", setUnits);
      fetchData("https://laptop-9efu9o2s/identityserver/Config/TaxSlabs", setTaxes);
    }
  }, [token]);
  const fetchData = async (endpoint, setter, name = "") => {
    console.log(`Fetching ${name || endpoint} from: ${endpoint}`);
  
    try {
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log(`Response for ${name || endpoint}: Status ${res.status}`);
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log(`Data fetched for ${name || endpoint}:`, data);
  
      setter(data);
    } catch (error) {
      console.error(`Error fetching ${name || endpoint}:`, error);
    }
  };
  

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

 

  const handleChange = (e) => {
    setIsDirty(true);
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Token not found. Please log in again.");

    try {
      const bodyData = {
        ...productData,
        brandId: selectedBrand?.id,
        locationIds: selectedLocations.map((loc) => loc.id),
        sizeId: selectedSize?.id,
        tagIds: selectedTags.map((tag) => tag.id),
      };

      const response = await fetch("https://laptop-9efu9o2s/catalogueserver/Catalogue/AllProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      alert("Product added successfully!");
      setIsDirty(false);
      navigate("/products");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  const handleClear = () => {
    setProductData({
      name: "",
      description: "",
      quantity: 0,
      unit: "",
      price: 0,
      tax: 0,
      purchasePrice: 0,
      discount: 0,
      brandId: null,
      locationIds: [],
      sizeId: null,
    });
    setSelectedBrand(null);
    setSelectedLocations([]);
    setSelectedSize(null);
    setSelectedTags([]);
    setSelectedUnit(null);
    setSelectedTax(null);
    setIsDirty(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-left mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Product Name</label>
            <input
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                backgroundColor: '#3d3d3d',
                color: 'white',
                border: '1px solid #3d3d3d'
              }}
            />
          </div>

       <div className="form-group col-md-4 mb-3">
          <label style={{ color: '#C9851E' }}>Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="form-control"
              style={{
                backgroundColor: '#3d3d3d',
                color: 'white',
                border: '1px solid #3d3d3d',
                height: '38px'
              }}
              rows={2}
            />
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              className="form-control"
              required
              style={{
                backgroundColor: '#3d3d3d',
                color: 'white',
                border: '1px solid #3d3d3d'
              }}
            />
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Unit</label>
            <button
              type="button"
              className="btn w-100 text-start"
              style={{ backgroundColor: "#3d3d3d", color: "white" }}
              onClick={() => setShowUnitList(true)}
            >
              {selectedUnit?.name || "Select Unit"}
            </button>
            {showUnitList && (
              <CommonList
                title="Unit"
                data={units}
                setData={(item) => {
                  setSelectedUnit(item);
                  setProductData((prev) => ({ ...prev, unit: item.name }));
                }}
                setShow={setShowUnitList}
              />
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Price</label>
             <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="form-control"
              style={{
                backgroundColor: '#3d3d3d',
                color: 'white',
                border: '1px solid #3d3d3d'
              }}
            />
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Tax</label>
            <button
              type="button"
              className="btn w-100 text-start"
              style={{ backgroundColor: "#3d3d3d", color: "white" }}
              onClick={() => setShowTaxList(true)}
            >
              {selectedTax?.name || "Select Tax"}
            </button>
            {showTaxList && (
              <CommonList
                title="Tax"
                data={taxes}
                setData={(item) => {
                  setSelectedTax(item);
                  setProductData((prev) => ({ ...prev, tax: item.value }));
                }}
                setShow={setShowTaxList}
              />
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
             <label style={{ color: '#C9851E' }}>Purchase Price</label>
             <input
              type="number"
              name="purchasePrice"
              value={productData.purchasePrice}
              onChange={handleChange}
              className="form-control"
              style={{
                backgroundColor: '#3d3d3d',
                color: 'white',
                border: '1px solid #3d3d3d'
              }}
            />
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Discount</label>
            <input
              type="number"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
              className="form-control"
              style={{
                backgroundColor: '#3d3d3d',
                color: 'white',
                border: '1px solid #3d3d3d'
              }}
            />
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Brand</label>
            <button
              type="button"
              className="btn w-100 text-start text-truncate"
              style={{ backgroundColor: "#3d3d3d", color: "white" }}

              onClick={() => setShowBrandList(true)}
            >
              {selectedBrand?.name || "Select Brand"}
            </button>
            {showBrandList && (
              <CommonList
                title="Brand"
                data={brands}
                setData={setSelectedBrand}
                setShow={setShowBrandList}
              />
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Locations</label>
            <button
              type="button"
              className="btn  w-100 text-start text-truncate"
              style={{ backgroundColor: "#3d3d3d", color: "white" }}

              onClick={() => setShowLocationList(!showLocationList)}
            >
              {selectedLocations.length > 0
                ? selectedLocations.map((l) => l.name).join(", ")
                : "Select Locations"}
            </button>
            {showLocationList && (
              <CommonList
                title="Locations"
                data={locations}
                setData={setSelectedLocations}
                setShow={setShowLocationList}
                isMultiple
                initialSelectedItems={selectedLocations}
              />
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Size</label>
            <button
              type="button"
              className="btn  w-100 text-start text-truncate"
              style={{ backgroundColor: "#3d3d3d", color: "white" }}

              onClick={() => setShowSizeList(true)}
            >
              {selectedSize?.name || "Select Size"}
            </button>
            {showSizeList && (
              <CommonList
                title="Size"
                data={sizes}
                setData={setSelectedSize}
                setShow={setShowSizeList}
              />
            )}
          </div>

          <div className="form-group col-md-4 mb-3">
            <label style={{ color: '#C9851E' }}>Tags</label>
            <button
              type="button"
              className="btn  w-100 text-start text-truncate"
              style={{ backgroundColor: "#3d3d3d", color: "white" }}
              onClick={() => setShowTagList(!showTagList)}
            >
              {selectedTags.length > 0
                ? selectedTags.map((t) => t.name).join(", ")
                : "Select Tags"}
            </button>
            {showTagList && (
              <CommonList
                title="Tags"
                data={tags}
                setData={setSelectedTags}
                setShow={setShowTagList}
                isMultiple
                initialSelectedItems={selectedTags}
              />
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center gap-4 mt-4">
          <button
            type="button"
            className="btn px-5"
            onClick={handleClear}
            style={{
              backgroundColor: "#3d3d3d",
              color: "white",
              border: "none",
              boxShadow: "none",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn px-5"
            style={{
              backgroundColor: "#C9851E",
              color: "white",
              border: "none",
              boxShadow: "none",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
