// src/pages/Chat/Chat.jsx
import React, { useState } from "react";
import ChatNavbar from "../../components/ChatNavbar/ChatNavbar";
import Slidebar from "../../components/Slidebar/Slidebar";
import Main from "../../components/Main/Main";
import "./Chat.css";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ---------------- MOBILE + TABLET (overlay sidebar) ---------------- */}
      <div className="chat-mobile">
        <ChatNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="chat-section-mobile">
          <Slidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          <main className="chat-main-mobile">
            <Main />
          </main>
        </div>
      </div>

      {/* ---------------- LAPTOP + DESKTOP (fixed sidebar) ---------------- */}
      <div className="chat-desktop">
        <div className="chat-section-desktop">
          <div
            className={`chat-slidebar-desktop ${
              isOpen ? "desktop-open" : "desktop-closed"
            }`}
          >
            <Slidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <div
            className={`chat-main-desktop ${
              isOpen ? "desktop-shift" : ""
            }`}
          >
            <ChatNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <Main />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
