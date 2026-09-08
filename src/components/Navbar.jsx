import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar({ businessName, logoUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Section links must work from the product and cart pages too:
  // go home first, then scroll to the section
  const goToSection = (id) => (e) => {
    e.preventDefault();
    closeMenu();

    const scroll = () => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    if (pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 150);
    } else {
      scroll();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          {logoUrl && (
            <img src={logoUrl} alt={businessName} className="navbar-logo" />
          )}
          <span className="navbar-name">{businessName || "Business Name"}</span>
        </Link>

        <div className="navbar-actions">
          <Link className="navbar-cart" to="/cart" onClick={closeMenu} aria-label={`Cart, ${totalItems} items`}>
            <FaShoppingCart />
            <span className="navbar-cart-count">{totalItems}</span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>

      {isOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

      <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>✕</button>
        <a href="/#home" onClick={goToSection("home")}>Home</a>
        <a href="/#projects" onClick={goToSection("projects")}>Products</a>
        <a href="/#about" onClick={goToSection("about")}>About</a>
        <a href="/#contact" onClick={goToSection("contact")}>Contact</a>
        <a href="/#contact" className="cta-button" onClick={goToSection("contact")}>Contact Now!</a>
      </div>
    </nav>
  );
}

export default Navbar;