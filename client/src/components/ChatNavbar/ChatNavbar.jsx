import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ChatNavbar.css";
import { BsLayoutSidebar } from "react-icons/bs";

import IdeaSlide from "../../assets/IdeaSlide-Logo-Light.png";

const ChatNavbar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header> 
        <div className="chat-header-container">
          <button
            className="chat-toggle-btn"
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isOpen}
          >
            <BsLayoutSidebar
              className="slider-icon"
              size={18}
              color="#afafaf"
            />
          </button>
          
          {/* Logo */}
          <div className="chat-logo-section">
            <img
              src={IdeaSlide}
              alt="IdeaSlide AI"
              className="chat-brand-logo"
            />
          </div>

          {/* CTA */}
          <div className="chat-cta-section">
            <p className="chat-login-button">Logout</p>
          </div>

          {/* Mobile Menu Toggle */}
        </div>
      </header>
    </>
  );
};

export default ChatNavbar;
