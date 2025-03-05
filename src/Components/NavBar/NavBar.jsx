import React, { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/images/logo.svg";
import ProfileIcon from "../../assets/icons/profile_icon.svg";
import NotificationIcon from "../../assets/icons/notification_icon.svg";
import SearchIcon from "../../assets/icons/search_icon.svg";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "../Search/Search";

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
      setMenuOpen(!menuOpen);
    }
  };

  const closeNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.remove("responsive_nav");
      setMenuOpen(false);
    }
  };

  return (
    <div className="navbar-container">
      <header>
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>

        {/* If search is open, show only the search bar */}
        {isSearchOpen ? (
          <SearchBar
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            setMenuOpen={setMenuOpen}
          />
        ) : (
          <nav className="nav-components" ref={navRef}>
            <div className="navigation-main">
              <ul className="header-list">
                <li className="hover:text-white" onClick={closeNavbar}>
                  <NavLink to="">Home</NavLink>
                </li>
                <li className="hover:text-white" onClick={closeNavbar}>
                  <NavLink to="builder">Builder</NavLink>
                </li>
                <li className="hover:text-white" onClick={closeNavbar}>
                  <NavLink to="guides">Guides</NavLink>
                </li>
                <li className="hover:text-white" onClick={closeNavbar}>
                  <NavLink to="community">Community</NavLink>
                </li>
                <li className="hover:text-white" onClick={closeNavbar}>
                  <NavLink to="browsecomponents">Browse Components</NavLink>
                </li>
              </ul>
            </div>

            <div className="icons-container">
              <div className="icons">
                <button
                  className="nav-icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <img src={SearchIcon} alt="Search" />
                </button>
                <button className="nav-icon">
                  <NavLink to="profile">
                    <img src={ProfileIcon} alt="Profile" />
                  </NavLink>
                </button>
                <button className="nav-icon">
                  <img src={NotificationIcon} alt="Notifications" />
                </button>
              </div>
              <div className="actual-btn">
                <NavLink to="login">
                  <button className="nav-icon log-button hover:outline ring-offset-2  transition-all duration-500 ease-in-out p-2 rounded-lg">
                    Log In
                  </button>
                </NavLink>
                <button className="nav-icon ai-button">Try AI</button>
              </div>
            </div>

            <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
              <FaTimes />
            </button>
          </nav>
        )}

        <button
          className={`nav-btn ${menuOpen ? "hide" : ""}`}
          onClick={toggleNavbar}
        >
          <FaBars />
        </button>
      </header>
    </div>
  );
}
