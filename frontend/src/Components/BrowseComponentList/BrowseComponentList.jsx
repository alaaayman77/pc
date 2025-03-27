import React from "react";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const BrowseComponentList = ({
  components,
  favorites,
  toggleFavorite,
  compareList,
  toggleCompare,
}) => {
  return (
    <div className="row">
      {components.length > 0 ? (
        components.map((component) => (
          <div key={component._id} className="w-1/3 px-2">
            <div className="component_card">
              <div className="componentCard_firstSec">
                <div className="rating_container">
                  <span className="rating_value">{component.rating}</span>
                  <FaStar className="rating_star" />
                </div>
                <span
                  className={`favorite-icon ${
                    favorites.includes(component._id) ? "favorited" : ""
                  }`}
                  onClick={() => toggleFavorite(component)}
                >
                  {favorites.includes(component._id) ? (
                    <FaHeart className="favorited" />
                  ) : (
                    <FaRegHeart className="unfavorited" />
                  )}
                </span>
              </div>
              <div className="componentCard_secondSec">
                <img
                  className="component_image"
                  src={component.image_source}
                  alt={component.title}
                />
                <p className="component_title">{component.title}</p>
                <p className="component_price">
                  <span>EGP</span>
                  {component.price}
                </p>
                <div
                  className={`compare-icon ${
                    compareList.includes(component._id) ? "compared" : ""
                  }`}
                  onClick={() => toggleCompare(component._id)}
                >
                  <button>
                    <p>Compare</p>
                    <MdArrowOutward />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No components found.</p>
      )}
    </div>
  );
};

export default BrowseComponentList;
