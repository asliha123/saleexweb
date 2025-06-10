
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import ProductCatalogue from "./ProductCatalogue";
import { useDispatch } from "react-redux";
import { fetchProductsRequest } from "../redux/slices/productSlice";

const CatalogueLayout = () => {
  const dispatch = useDispatch();
  const [savedFilters, setSavedFilters] = useState([]);
  const [selectedSavedFilter, setSelectedSavedFilter] = useState(null);

  useEffect(() => {
    const storedFilters =
      JSON.parse(localStorage.getItem("savedFilters")) || [];
    setSavedFilters(storedFilters);
  }, []);

  const applySavedFilter = (filter) => {
    dispatch(fetchProductsRequest(filter.filters));
    setSelectedSavedFilter(filter);
  };

  const saveFilter = (newFilter) => {
    let updatedFilters = [...savedFilters];

    const existingIndex = savedFilters.findIndex(
      (f) => f.name === selectedSavedFilter?.name
    );

    if (existingIndex !== -1) {
      updatedFilters[existingIndex] = newFilter;
    } else {
      updatedFilters.push(newFilter);
    }

    setSavedFilters(updatedFilters);
    localStorage.setItem("savedFilters", JSON.stringify(updatedFilters));
    setSelectedSavedFilter(newFilter);
  };

  const handleFiltersCleared = (appliedFilters) => {
    if (appliedFilters?.length === 0) {
      setSelectedSavedFilter(null);
    }
  };

  const deleteFilter = (filterName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${filterName}"?`
    );
    if (!confirmDelete) return;

    const updatedFilters = savedFilters.filter(
      (filter) => filter.name !== filterName
    );
    setSavedFilters(updatedFilters);
    localStorage.setItem("savedFilters", JSON.stringify(updatedFilters));

    setSelectedSavedFilter(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={styles.savedFiltersBar}>
        {savedFilters.length > 0 ? (
          savedFilters.map((filter, index) => (
            <button
              key={index}
              style={{
                ...styles.filterButton,
                background:
                  selectedSavedFilter?.name === filter.name
                    ? "#C9851E"
                    : "#444",
                color:
                  selectedSavedFilter?.name === filter.name ? "#fff" : "#ddd",
              }}
              onClick={() => applySavedFilter(filter)}
            >
              {filter.name}
            </button>
          ))
        ) : (
          <p style={{ color: "#aaa", fontSize: "14px" }}>No filters</p>
        )}
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.sidebar}>
          <Filters />
        </div>
        <div style={styles.catalogueArea}>
          <ProductCatalogue
            saveFilter={saveFilter}
            selectedSavedFilter={selectedSavedFilter}
            onFiltersCleared={handleFiltersCleared}
            deleteFilter={deleteFilter}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  savedFiltersBar: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "6px",
    background: "#2e2d2d",
    padding: "6px 12px",
    borderBottom: "2px solid #3d3d3d",
    minHeight: "50px",
    
  },
  filterButton: {
    background: "#444",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "12px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100vh",
    overflowY: "auto",
  },
  sidebar: {
    width: "280px",
    position: "sticky",
    top: 0,
    flexShrink: 0,
    background: "#2a2a2a",
    borderRight: "2px solid #3d3d3d",
    height: "fit-content",
  },
  catalogueArea: {
    flex: 1,
  },
};

export default CatalogueLayout
