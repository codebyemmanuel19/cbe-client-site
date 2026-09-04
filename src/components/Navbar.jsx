import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ businessName, logoUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">
          {logoUrl ? (
            <img src={logoUrl} alt={businessName} className="navbar-logo" />
          ) : (
            businessName || "Business Name"
          )}
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Backdrop overlay that closes the drawer when clicking outside on mobile */}
      {isOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

      <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>✕</button>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href="#contact" className="cta-button" onClick={closeMenu}>Contact Now!</a>
      </div>
    </nav>
  );
}

export default Navbar;