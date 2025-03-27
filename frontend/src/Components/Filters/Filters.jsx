import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MdFilterAlt } from "react-icons/md";
import { Menu, Checkbox, Tag } from "antd";
import "./Filters.css";

const COMPONENT_FILTERS = {
  cpu: {
    Manufacturer: ["Intel", "AMD"],
    "Socket Type": ["LGA1700", "AM5", "LGA1200", "AM4"],
    "Number of Cores": ["4", "6", "8", "10", "12", "16+"],
    "Number of Threads": ["8", "12", "16", "24", "32+"],
  },
  gpu: {
    Manufacturer: ["NVIDIA", "AMD", "Intel"],
    "Memory Size": ["4 GB", "6 GB", "8 GB", "12 GB", "16 GB", "24 GB"],
    "Memory Type": ["GDDR5", "GDDR6", "GDDR6X", "GDDR3"],
    Brand: [
      "MSI",
      "SAPPHIRE",
      "ZOTAC",
      "ASUS",
      "Gigabyte",
      "GALAX",
      "Palit",
      "Sparkle Computer",
      "PNY",
    ],
  },
  default: {
    Manufacturer: ["Intel", "AMD", "NVIDIA"],
  },
};

const sortingCategories = {
  Price: ["Low to High", "High to Low"],
  Rating: ["Low to High", "High to Low"],
};

function Filters({
  onSortChange,
  onFilterChange,
  initialFilters = {},
  initialSort = null,
}) {
  const { type } = useParams();
  const [filterCategories, setFilterCategories] = useState(
    COMPONENT_FILTERS.default
  );
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const clearAllFilters = useCallback(() => {
    setSelectedFilters([]);
    setSelectedSort(null);
    onFilterChange({});
    onSortChange(null);
  }, [onFilterChange, onSortChange]);

  const handleFilterChange = useCallback(
    (category, value, checked) => {
      setSelectedFilters((prev) => {
        const newFilters = checked
          ? [...prev, { category, value }]
          : prev.filter((f) => !(f.category === category && f.value === value));

        const apiParams = {};
        const filtersByCategory = newFilters.reduce((acc, filter) => {
          if (!acc[filter.category]) acc[filter.category] = [];
          acc[filter.category].push(filter.value);
          return acc;
        }, {});

        Object.entries(filtersByCategory).forEach(([category, values]) => {
          switch (category) {
            case "Manufacturer":
              apiParams.manufacturer = values.map((v) => v.toLowerCase());
              break;
            case "Socket Type":
              apiParams.socketType = values;
              break;
            case "Number of Cores":
              const coreValues = values.map((v) =>
                parseInt(v.replace("+", ""))
              );
              apiParams.minCores = Math.min(...coreValues);
              if (!values.some((v) => v.includes("+"))) {
                apiParams.maxCores = Math.max(...coreValues);
              }
              break;
            case "Number of Threads":
              const threadValues = values.map((v) =>
                parseInt(v.replace("+", ""))
              );
              apiParams.minThreads = Math.min(...threadValues);
              if (!values.some((v) => v.includes("+"))) {
                apiParams.maxThreads = Math.max(...threadValues);
              }
              break;
            case "Memory Size":
              apiParams.memorySize = values;
              break;
            case "Memory Type":
              apiParams.memoryType = values;
              break;
            default:
              apiParams[category.toLowerCase().replace(" ", "")] = values;
          }
        });

        onFilterChange(apiParams);
        return newFilters;
      });
    },
    [onFilterChange]
  );

  const handleRemoveFilter = useCallback(
    (category, value) => {
      handleFilterChange(category, value, false);
    },
    [handleFilterChange]
  );

  const handleSortChange = useCallback(
    (category, value) => {
      const sortValue =
        category === "Price"
          ? `price:${value === "Low to High" ? "asc" : "desc"}`
          : `rating:${value === "Low to High" ? "asc" : "desc"}`;

      setSelectedSort(sortValue);
      onSortChange(sortValue);
    },
    [onSortChange]
  );

  useEffect(() => {
    const componentType = type?.toLowerCase();
    setFilterCategories(
      COMPONENT_FILTERS[componentType] || COMPONENT_FILTERS.default
    );
    clearAllFilters();
  }, [type, clearAllFilters]);

  useEffect(() => {
    if (Object.keys(initialFilters).length === 0) {
      setSelectedFilters([]);
    }
    if (!initialSort) {
      setSelectedSort(null);
    }
  }, [initialFilters, initialSort]);

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
      children: options.map((option) => {
        const isSelected =
          selectedSort ===
          (category === "Price"
            ? `price:${option === "Low to High" ? "asc" : "desc"}`
            : `rating:${option === "Low to High" ? "asc" : "desc"}`);

        return {
          key: `${category}-${option}`,
          label: (
            <div
              className={`sort-option ${isSelected ? "selected" : ""}`}
              onClick={() => handleSortChange(category, option)}
            >
              {option}
            </div>
          ),
        };
      }),
    })
  );

  return (
    <div className="filter_container">
      <div className="filter_main">
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
                  <Tag
                    closable
                    onClose={() => {
                      setSelectedSort(null);
                      onSortChange(null);
                    }}
                  >
                    {selectedSort === "price:asc" && "Price: Low to High"}
                    {selectedSort === "price:desc" && "Price: High to Low"}
                    {selectedSort === "rating:asc" && "Rating: Low to High"}
                    {selectedSort === "rating:desc" && "Rating: High to Low"}
                  </Tag>
                )}
              </>
            )}
          </div>
        </div>
        <div className="filter_secondary">
          <Menu mode="inline" items={filterItems} />
          <div className="filter_divider"></div>
          <div className="filter_sorting">
            <h3>Sort By</h3>
            <Menu mode="inline" items={sortingItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
