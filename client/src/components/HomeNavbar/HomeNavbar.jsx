import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./HomeNavbar.css";
import IdeaSlide from "../../assets/IdeaSlide-Logo-dark.png";

import { MdMenu } from "react-icons/md";

const HomeNavbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);

      // Active section highlighting
      const sections = [
        "home",
        "why-choose-us",
        "supported-formats",
        "how-it-works",
      ];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Offset value (navbar height)
  const scrollOffset = -80; // 👈 tweak this (e.g. -60 or -100)

  return (
    <>
      <header
        className={`nav-header ${hasScrolled ? "nav-header-scrolled" : ""}`}
      > 
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo-section">
            <ScrollLink
              to="home"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              spy={true}
              className="logo-link"
            >
              <img
                src={IdeaSlide}
                alt="IdeaSlide AI"
                className="nav-logo"
              />
            </ScrollLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <ScrollLink
              to="why-choose-us"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              spy={true}
              className={`nav-link ${
                activeSection === "why-choose-us" ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Why Choose Us
            </ScrollLink>

            <ScrollLink
              to="supported-formats"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              spy={true}
              className={`nav-link ${
                activeSection === "supported-formats" ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Supported Formats
            </ScrollLink>

            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              spy={true}
              className={`nav-link ${
                activeSection === "how-it-works" ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </ScrollLink>
          </nav>

          {/* CTA */}
          <div className="nav-cta-section">
            <Link to="/chat" className="nav-cta-button">
              <span className="button-text">Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span><MdMenu/></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav-links">
            <ScrollLink
              to="why-choose-us"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              className={`mobile-nav-link ${
                activeSection === "why-choose-us" ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Why Choose Us
            </ScrollLink>

            <ScrollLink
              to="supported-formats"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              className={`mobile-nav-link ${
                activeSection === "supported-formats" ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Supported Formats
            </ScrollLink>

            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={0}
              offset={scrollOffset}
              className={`mobile-nav-link ${
                activeSection === "how-it-works" ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </ScrollLink>
          </nav>

          <div className="mobile-cta-section">
            <Link
              to="/chat"
              className="mobile-cta-button"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavbar;