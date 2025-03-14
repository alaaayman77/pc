import React, { useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Menu, Checkbox, Tag } from "antd";
import "./Community.css";

const filterCategories = {
  Manufacturer: ["Intel", "AMD"],
  Series: ["Intel", "AMD"],
  GPU: ["NVIDIA", "AMD Radeon"],
  RAM: ["8GB", "16GB", "32GB"],
};

const sortingCategories = {
  Price: ["Low to High", "High to Low"],
  Rating: ["1", "2", "3", "4", "5"],
};

function Community() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null); // State for sorting

  const handleFilterChange = (category, value, checked) => {
    setSelectedFilters((prev) =>
      checked
        ? [...prev, { category, value }]
        : prev.filter((f) => !(f.category === category && f.value === value))
    );
  };

  const handleRemoveFilter = (category, value) => {
    setSelectedFilters((prev) =>
      prev.filter((f) => !(f.category === category && f.value === value))
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedSort(null); // Reset sorting when clearing filters
  };

  const filterItems = Object.entries(filterCategories).map(
    ([category, options]) => ({
      key: category,
      label: category,
      children: options.map((option) => ({
        key: `${category}-${option}`,
        label: (
          <Checkbox
            checked={selectedFilters.some(
              (f) => f.category === category && f.value === option
            )}
            onChange={(e) =>
              handleFilterChange(category, option, e.target.checked)
            }
          >
            {option}
          </Checkbox>
        ),
      })),
    })
  );

  const sortingItems = Object.entries(sortingCategories).map(
    ([category, options]) => ({
      key: category,
      label: category,
      children: options.map((option) => ({
        key: `${category}-${option}`,
        label: (
          <div
            className={`sort-option ${
              selectedSort === option ? "selected" : ""
            }`}
            onClick={() => setSelectedSort(option)}
          >
            {option}
          </div>
        ),
      })),
    })
  );

  return (
    <div className="community_container">
      <div className="community_main">
        <div className="filters_headers">
          <div className="filter_firstHeader">
            <MdFilterAlt />
            <h3>Filters</h3>
          </div>
          <div className="filter_secondHeader">
            <p>Applied Filters</p>
            <button className="filter_clearallBtn" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
          <div className="filter_thirdHeader">
            {selectedFilters.length === 0 && !selectedSort ? (
              <p>All</p>
            ) : (
              <>
                {selectedFilters.map(({ category, value }) => (
                  <Tag
                    key={`${category}-${value}`}
                    closable
                    onClose={() => handleRemoveFilter(category, value)}
                  >
                    {value}
                  </Tag>
                ))}
                {selectedSort && (
                  <Tag closable onClose={() => setSelectedSort(null)}>
                    {selectedSort}
                  </Tag>
                )}
              </>
            )}
          </div>
        </div>
        <div className="community_secondary">
          <Menu mode="inline" items={filterItems} />
          <h3>Sort By</h3>
          <Menu mode="inline" items={sortingItems} />
        </div>
      </div>
    </div>
  );
}

export default Community;
