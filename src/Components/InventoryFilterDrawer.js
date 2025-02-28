import React, { useState, useEffect } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const InventoryFilterDrawer = ({ setProductsFilter, productsFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Fetch Filters
  useEffect(() => {
    async function fetchAllFilters() {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}catalogueserver/Catalogue/CatalogueFilters`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
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

  // Handle Drawer Toggle
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setShowFilter(open);
  };

  // Filter Logic
  const handleApply = () => {
    if (selectedFilters.length > 0) {
      const filters = {
        hasHasFilter: true,
        hasSearchText: false,
        searchText: [],
        bestSeller: false,
        newArrival: false,
        hasTagsSearch: false,
        tagsSearch: [],
        hasBrandSearch: false,
        brandSearch: [],
        hasLocationsSearch: false,
        locationsSearch: [],
      };

      selectedFilters.forEach((item) => {
        switch (item.type) {
          case 102:
            filters.bestSeller = filters.bestSeller || item.id === 101;
            filters.newArrival = filters.newArrival || item.id === 102;
            break;
          case 103:
            filters.hasTagsSearch = true;
            filters.tagsSearch.push(item.id);
            break;
          case 104:
            filters.hasBrandSearch = true;
            filters.brandSearch.push(item.id);
            break;
          case 105:
            filters.hasLocationsSearch = true;
            filters.locationsSearch.push(item.id);
            break;
        }
      });

      setProductsFilter(filters);
    }
    setShowFilter(false);
  };

  const handleClear = () => {
    setSelectedFilters([]);
    setProductsFilter({});
    setShowFilter(false);
  };

  const handleSelectFilter = (filter) => {
    setSelectedFilters((prev) =>
      !prev.some(
        (e) => e.id === filter.id && e.type === filter.type
      )
        ? [...prev, filter]
        : prev
    );
  };

  const handleDeselectFilter = (id, type) => {
    setSelectedFilters((prev) =>
      prev.filter((item) => !(item.id === id && item.type === type))
    );
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={showFilter}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: "300px", padding: "16px" },
        }}
      >
        <h3>Filters</h3>

        <div>
          {selectedFilters.length > 0 &&
            selectedFilters.map((item) => (
              <span key={`${item.type}-${item.id}`} style={{ marginRight: 8 }}>
                {item.name}
                <button onClick={() => handleDeselectFilter(item.id, item.type)}>
                  x
                </button>
              </span>
            ))}
        </div>

        <div>
          {availableFilters?.popularities?.length > 0 && (
            <>
              <h4>Popularity</h4>
              {availableFilters.popularities.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelectFilter(item)}
                  style={{
                    marginRight: 8,
                    color: selectedFilters.some(
                      (s) => s.id === item.id && s.type === item.type
                    )
                      ? "red"
                      : "black",
                  }}
                >
                  {item.name}
                </button>
              ))}
            </>
          )}

          {availableFilters?.tags?.length > 0 && (
            <>
              <h4>Tags</h4>
              {availableFilters.tags.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelectFilter(item)}
                  style={{
                    marginRight: 8,
                    color: selectedFilters.some(
                      (s) => s.id === item.id && s.type === item.type
                    )
                      ? "red"
                      : "black",
                  }}
                >
                  {item.name}
                </button>
              ))}
            </>
          )}
        </div>

        <div style={{ marginTop: "16px" }}>
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleApply}>Apply</button>
        </div>
      </Drawer>
    </>
  );
};

export default InventoryFilterDrawer;
