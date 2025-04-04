
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../redux/slices/productSlice";
import { FaSearch, FaTimes } from "react-icons/fa";

const Filters = () => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.products.appliedFilters);
  const [availableFilters, setAvailableFilters] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(appliedFilters || []);
  const [searchQueries, setSearchQueries] = useState({});

  useEffect(() => {
    async function fetchAllFilters() {
      const token =
        "";
      const response = await fetch(
        "",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data?.isSuccess) {
          setAvailableFilters(data.response);
        }
      }
    }
    fetchAllFilters();
  }, []);

  useEffect(() => {
    setSelectedFilters(appliedFilters);
  }, [appliedFilters]);

  // const handleFilterChange = (type, id, name) => {
  //   let newFilters = selectedFilters?.some((f) => f.id === id && f.type === type)
  //     ? selectedFilters.filter((f) => !(f.id === id && f.type === type))
  //     : [...selectedFilters, { id, type, name }];

  //   setSelectedFilters(newFilters);
  //   dispatch(fetchProductsRequest(newFilters));
  // };
  const handleFilterChange = (type, id, name) => {
    const filters = Array.isArray(selectedFilters) ? selectedFilters : [];
  
    let newFilters = filters.some((f) => f.id === id && f.type === type)
      ? filters.filter((f) => !(f.id === id && f.type === type))
      : [...filters, { id, type, name }];
  
    setSelectedFilters(newFilters);
    dispatch(fetchProductsRequest(newFilters));
  };

  const handleClearAll = () => {
    setSelectedFilters([]);
    dispatch(fetchProductsRequest([]));
  };

  const handleSearchChange = (categoryKey, value) => {
    setSearchQueries({ ...searchQueries, [categoryKey]: value });
  };

  const toggleSearch = (categoryKey) => {
    setSearchQueries((prev) => {
      const newQueries = { ...prev };
      if (newQueries[categoryKey] !== undefined) {
        delete newQueries[categoryKey];
      } else {
        newQueries[categoryKey] = "";
      }
      return newQueries;
    });
  };

  const categories = [
    { title: "Popularity", key: "popularities", type: 102 },
    { title: "Tags", key: "tags", type: 103 },
    { title: "Brands", key: "brandsSearch", type: 104 },
    { title: "Locations", key: "locations", type: 105 },
  ];

  return (
    <div className="bg-primary" style={styles.filtersContainer}>
      <div style={styles.filtersHeader}>
        <h4 style={styles.filtersTitle}>Filters</h4>
        {appliedFilters?.length > 0 && (
          <button onClick={handleClearAll} style={styles.clearButton}>
            CLEAR ALL
          </button>
        )}
      </div>

      {categories.map((category) => {
        const filteredOptions = (availableFilters?.[category.key] || []).filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(searchQueries[category.key]?.toLowerCase() || "")
        );

        return (
          <div key={category.title} style={styles.filterCategory}>
            <div style={styles.categoryHeader}>
              {searchQueries[category.key] !== undefined ? (
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQueries[category.key]}
                  onChange={(e) =>
                    handleSearchChange(category.key, e.target.value)
                  }
                  style={styles.searchInput}
                />
              ) : (
                <h5 style={styles.categoryTitle}>{category.title}</h5>
              )}
              <button
                onClick={() => toggleSearch(category.key)}
                style={styles.searchIcon}
              >
                {searchQueries[category.key] !== undefined ? (
                  <FaTimes />
                ) : (
                  <FaSearch />
                )}
              </button>
            </div>
            <div style={styles.filterOptions}>
              {filteredOptions.map((item) => (
                <button
                  key={item.id}
                  style={{
                    ...styles.filterButton,
                    background: selectedFilters?.some(
                      (f) => f.id === item.id && f.type === category.type
                    )
                      ? "#C9851E"
                      : "#444",
                    color: selectedFilters?.some(
                      (f) => f.id === item.id && f.type === category.type
                    )
                      ? "#fff"
                      : "#ddd",
                  }}
                  onClick={() =>
                    handleFilterChange(category.type, item.id, item.name)
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  filtersContainer: {
    width: "100%",
    padding: "20px",
    color: "#ddd",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    
  },
  filtersHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filtersTitle: {
    color: "#C9851E",
    fontSize: "20px",
    fontWeight: "500",
  },
  clearButton: {
    background: "transparent",
    border: "none",
    color: "#C9851E",
    fontSize: "14px",
    cursor: "pointer",
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    background: "#333",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "8px",
    color: "#ddd",
    outline: "none",
    flex: 1,
    marginBottom: 5,
  },
  saveButton: {
    background: "#C9851E",
    border: "none",
    borderRadius: "8px",
    padding: "8px 10px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
  filterCategory: {
    background: "#333",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  categoryTitle: {
    fontSize: "16px",
    color: "#C9851E",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  filterOptions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },
  searchInput: {
    flex: 1,
    padding: "6px 10px",
    borderRadius: "15px",
    border: "1px solid #555",
    background: "#333",
    color: "#ddd",
    outline: "none",
  },
  searchIcon: {
    background: "transparent",
    border: "none",
    color: "#C9851E",
    fontSize: "16px",
    cursor: "pointer",
  },
  filterButton: {
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
    outline: "none",
  },
};

export default Filters;
