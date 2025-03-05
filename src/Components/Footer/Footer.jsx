import React from "react";
import Logo from "../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaTiktok, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-logo">
          <img src={Logo} width={30} alt="Logo" />
        </div>
        <div className="get-started-container">
          <p>Get Started</p>
          <ul className="footer-list">
            <li>
              <NavLink to="Builder">Builder</NavLink>{" "}
            </li>
            <li>
              <NavLink to="guider">Guides</NavLink>{" "}
            </li>
            <li>
              <NavLink to="articles">Articles</NavLink>{" "}
            </li>
            <li>
              <NavLink to="browsecomponents">Browse</NavLink>{" "}
            </li>
          </ul>
        </div>
        <div className="account-container">
          <p>Account</p>
          <ul className="footer-list">
            <li>
              <NavLink to="signup">Sign in</NavLink>{" "}
            </li>
            <li>
              <NavLink to="">View Collection</NavLink>{" "}
            </li>
            <li>
              <NavLink to="">Delete Collection</NavLink>{" "}
            </li>
          </ul>
        </div>
        <div className="pcsmith-container">
          <p>PCSmith</p>
          <ul className="footer-list">
            <li>
              <NavLink to="">Developers</NavLink>
            </li>
            <li>
              <NavLink to="">About</NavLink>
            </li>
            <li>
              <NavLink to="">Help</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-btn">
          <button>Sign up</button>
        </div>
        <div className="footer-moto">
          <p>
            Say goodbye to confusion and enjoy peaceful pc building without a
            nerd in your ear.
          </p>
        </div>
        <div className="footer-links">
          <i>
            <FaFacebook />
          </i>
          <i>
            <FaYoutube />
          </i>
          <i>
            <FaTwitter />
          </i>
          <i>
            <FaTiktok />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
