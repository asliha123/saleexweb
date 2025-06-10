
import React, { useEffect, useState } from "react";

const CommonList = ({
  title,
  data = [],
  setData,
  setShow,
  isMultiple = false,
  initialSelectedItems = [],
}) => {
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  useEffect(() => {
    setSelectedItems(initialSelectedItems || []);
  }, [initialSelectedItems]);

  const handleClick = (item) => {
    if (isMultiple) {
      const alreadySelected = selectedItems.find((i) => i.id === item.id);
      let updated;
      if (alreadySelected) {
        updated = selectedItems.filter((i) => i.id !== item.id);
      } else {
        updated = [...selectedItems, item];
      }
      setSelectedItems(updated);
      setData(updated);
    } else {
      setData(item);
      setShow(false);
    }
  };

  const isSelected = (item) =>
    isMultiple
      ? selectedItems.some((i) => i.id === item.id)
      : selectedItems?.id === item.id;

  return (
    <div
      className="position-absolute bg-white border shadow rounded p-3"
      style={{ zIndex: 1000 }}
    >
      <h5 className="mb-3">{title}</h5>
      <ul
        className="list-unstyled m-0"
        style={{ maxHeight: 200, overflowY: "auto" }}
      >
        {(Array.isArray(data) ? data : []).map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item)}
            className={`p-2 mb-1 rounded ${
              isSelected(item) ? "bg-warning text-white" : "bg-light"
            }`}
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonList;
