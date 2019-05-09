import { NavLink } from "react-router-dom";
import React, { memo } from "react";
import "./Navbar.css";

const Navbar = memo(function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="navbar-brand" to="/home">
        Brand
      </NavLink>
      <ul className="navbar-nav">
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/home">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/learn">
            Learn
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});

export default Navbar;
