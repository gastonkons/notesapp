import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const handleMenu = (item) => {
    const navbar = document.querySelector(".navbar-nav");
    const button = document.querySelector(".navbar-btn");
    if (item === "button") {
      navbar.classList.toggle("open");
      button.classList.toggle("open");
    } else if (item === "link") {
      if (navbar.classList.contains("open")) {
        navbar.classList.remove("open");
        button.classList.remove("open");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-brand-link"
            onClick={() => handleMenu("link")}
          >
            NotesApp
          </Link>
        </div>
        <button className="navbar-btn" onClick={() => handleMenu("button")}>
          {">"}
        </button>
        <div className="navbar-nav">
          <ul>
            <li>
              <Link
                to="/"
                className="navbar-link"
                onClick={() => handleMenu("link")}
              >
                Notes
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="navbar-link"
                onClick={() => handleMenu("link")}
              >
                Create Note
              </Link>
            </li>
            <li>
              <Link
                to="/user"
                className="navbar-link"
                onClick={() => handleMenu("link")}
              >
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
