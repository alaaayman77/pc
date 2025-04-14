import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLink,
  FaTelegram,
  FaReddit,
  FaTimes,
} from "react-icons/fa";
import "./FullComponentDetails.css";

const specTemplates = {
  cpu: [
    { label: "Cores", key: "cores" },
    { label: "Threads", key: "threads" },
    { label: "Base Clock", key: "base_clock" },
    { label: "Boost Clock", key: "boost_clock" },
    { label: "Socket", key: "socket" },
    { label: "Cache", key: "cache" },
    { label: "TDP", key: "tdp" },
  ],
  gpu: [
    { label: "Brand", key: "brand" },
    { label: "Manufacturer", key: "manfacturer" },
    { label: "Graphics Co Processor", key: "Graphics_Co_Processpr" },
    { label: "Series", key: "series" },
    { label: "Video Output Interface", key: "video_output_interface" },
    { label: "Clock Speed", key: "clock_speed" },
  ],
};

function FullComponentDetails({ component, favorites, toggleFavorite }) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="whatsapp-icon" />,
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `Check out this ${component.category}: ${component.title}\n${component.product_link}`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="facebook-icon" />,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            component.product_link
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="twitter-icon" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out this ${component.category}: ${component.title}`
          )}&url=${encodeURIComponent(component.product_link)}`,
          "_blank"
        );
      },
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="telegram-icon" />,
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            component.product_link
          )}&text=${encodeURIComponent(
            `Check out this ${component.category}: ${component.title}`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Reddit",
      icon: <FaReddit className="reddit-icon" />,
      action: () => {
        window.open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(
            component.product_link
          )}&title=${encodeURIComponent(
            `${component.title} - PC Builder Component`
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Copy Link",
      icon: <FaLink className="link-icon" />,
      action: () => {
        navigator.clipboard.writeText(component.product_link);
        alert("Product link copied to clipboard!");
        setShowShareMenu(false);
      },
    },
  ];

  const allSpecs = {
    ...component,
    _id: undefined,
    image_source: undefined,
    product_name: undefined,
    title: undefined,
    price: undefined,
    rating: undefined,
    product_link: undefined,
  };

  const componentType = (component?.category || "all")
    .toString()
    .toLowerCase()
    .trim();
  const specTemplate = specTemplates[componentType];

  const availableSpecs = Object.entries(allSpecs).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  const hasSpecs = Object.keys(availableSpecs).length > 0;

  const renderSpecItem = (label, value) => (
    <li key={label} className="FullDetails_spec-item">
      <span className="FullDetails_spec-label">{label} :</span>
      <span className="FullDetails_spec-value">{value}</span>
    </li>
  );

  return (
    <div className="FullDetails_container">
      {/* Share Popup Modal */}
      {showShareMenu && (
        <div
          className="share-modal-overlay"
          onClick={() => setShowShareMenu(false)}
        >
          <div
            className="share-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="share-modal-header">
              <h3>Share this product</h3>
              <button
                className="close-share-menu"
                onClick={() => setShowShareMenu(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="share-options-grid">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  className="share-option"
                  onClick={() => {
                    option.action();
                    setShowShareMenu(false);
                  }}
                >
                  <span className="share-option-icon">{option.icon}</span>
                  <span className="share-option-text">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="FullDetails_primary">
        <div className="FullDetails_favorite">
          <span
            className={`favorite-icon ${
              favorites.includes(component?._id) ? "favorited" : ""
            }`}
            onClick={() => toggleFavorite(component)}
          >
            {favorites.includes(component?._id) ? (
              <FaHeart className="favorited" style={{ fontSize: "30px" }} />
            ) : (
              <FaRegHeart
                className="unfavorited"
                style={{ fontSize: "30px" }}
              />
            )}
          </span>
        </div>
        <div className="FullDetails_image">
          <img
            src={component?.image_source}
            alt={component?.title || "Component image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "default-component-image.jpg";
            }}
          />
        </div>
        <div className="FullDetails_divider"></div>
        <div className="FullDetails_description">
          <h3>Description</h3>
          <p>{component?.product_name || "No description available."}</p>
        </div>
      </div>
      <div className="FullDetails_secondary">
        <h2>{component?.title || "Component Title"}</h2>
        <div className="FullDetails_price_rate">
          <div className="FullDetails_price">
            <span>EGP</span>
            {component?.price || "N/A"}
          </div>
          <div className="FullDetails_rating">
            <span>{component?.rating || "0"}</span>
            <FaStar className="rating_star" size={20} />
          </div>
        </div>

        <div className="FullDetails_specs">
          <h3>Specifications</h3>
          {hasSpecs ? (
            <ul className="FullDetails_specs-list">
              {specTemplate
                ? specTemplate.map((spec) => {
                    const value = availableSpecs[spec.key];
                    return value && renderSpecItem(spec.label, value);
                  })
                : Object.entries(availableSpecs).map(([key, value]) =>
                    renderSpecItem(key.replace(/_/g, " "), value)
                  )}
            </ul>
          ) : (
            <p className="FullDetails_no-specs-message">
              No specifications available
            </p>
          )}
        </div>

        <div className="FullDetails_Buttons">
          <button
            className="FullDetails_share-button"
            onClick={() => setShowShareMenu(true)}
          >
            <IoMdShareAlt className="FullDetails_button-icon" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FullComponentDetails;
