import React, { useCallback, useState } from "react";
import "./Community.css";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";

function Community() {
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
    },
    [navigate]
  );

  const handleSortChange = useCallback(
    (sortValue) => {
      setSortBy(sortValue);
    },
    [navigate]
  );

  return (
    <div className="Community_Container">
      <div className="community_filter">
        <Filters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          initialFilters={filters}
          initialSort={sortBy}
        />
      </div>
      <div className="community_main"></div>
    </div>
  );
}

export default Community;
