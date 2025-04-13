import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import NestedNavBar from "../NestedNavBar/NestedNavBar";
import Filters from "../Filters/Filters";
import axios from "axios";
import "./BrowseComponents.css";
import { SavedComponentsContext } from "../../Context/SavedComponentContext";
import ComponentList from "../BrowseComponentList/BrowseComponentList";

function BrowseComponents() {
  const { type = "all" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { savedComponents, setSavedComponents } = useContext(
    SavedComponentsContext
  );

  const pageSize = 10;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const getComponents = useCallback(
    async (componentType) => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage,
          pageSize,
          ...filters,
        };
        if (sortBy) params.sortBy = sortBy;

        const { data } = await axios.get(
          `http://localhost:4000/api/components/${componentType}`,
          { params }
        );
        setComponents(data);
      } catch (error) {
        console.error("Error fetching components:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, filters, sortBy]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      navigate(`/browsecomponents/${type}?page=1`);
    },
    [navigate, type]
  );

  const handleSortChange = useCallback(
    (sortValue) => {
      setSortBy(sortValue);
      navigate(`/browsecomponents/${type}?page=1`);
    },
    [navigate, type]
  );

  const toggleFavorite = useCallback(
    (component) => {
      setFavorites((prev) =>
        prev.includes(component._id)
          ? prev.filter((fav) => fav !== component._id)
          : [...prev, component._id]
      );

      if (setSavedComponents) {
        setSavedComponents((prev) => {
          const updated = { ...prev };
          const category = component.category.toLowerCase();

          if (!updated.all) updated.all = [];
          if (!updated.all.some((item) => item._id === component._id)) {
            updated.all.push({ ...component, type: category });
          }

          if (!updated[category]) updated[category] = [];
          if (!updated[category].some((item) => item._id === component._id)) {
            updated[category].push({ ...component, type: category });
          }

          return updated;
        });
      }
    },
    [setSavedComponents]
  );

  const toggleCompare = useCallback((id) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((comp) => comp !== id) : [...prev, id]
    );
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      navigate(`/browsecomponents/${type}?page=${page}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate, type]
  );

  useEffect(() => {
    // Clear filters when type changes
    setFilters({});
    setSortBy(null);
    navigate(`/browsecomponents/${type}?page=1`);
  }, [type, navigate]);

  useEffect(() => {
    getComponents(type);
  }, [type, getComponents]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedComponents = components.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="browsecomponents_container">
      <div className="browsecomponents_filter">
        <Filters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          initialFilters={filters}
          initialSort={sortBy}
        />
      </div>
      <div className="browsecomponents_main">
        <div className="browsecomponents_nav">
          <NestedNavBar />
        </div>
        <div className="browsecomponents_products">
          <ComponentList
            components={paginatedComponents}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            compareList={compareList}
            toggleCompare={toggleCompare}
            isLoading={isLoading}
          />
        </div>
        <div className="browsecomponents_pagination">
          <Pagination
            align="end"
            current={currentPage}
            pageSize={pageSize}
            total={components.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default BrowseComponents;
