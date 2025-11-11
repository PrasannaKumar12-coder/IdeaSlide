import React, { useState } from "react";
import "./Slidebar.css";
import IdeaSlidePNG from "../../assets/Ideaslide-favicon.png";
import { BsLayoutSidebar } from "react-icons/bs";
import { SlNote } from "react-icons/sl";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [recentChats, setRecentChats] = useState([
    { id: 1, name: "Project Discussion" },
    { id: 2, name: "Meeting Notes" }, 
    { id: 3, name: "Brainstorming Session" },
    { id: 4, name: "Client Feedback" },
  ]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const deleteChat = (id) => {
    setRecentChats(recentChats.filter((chat) => chat.id !== id));
  };

  const startNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Chat ${recentChats.length + 1}`,
    };
    setRecentChats([newChat, ...recentChats]);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Main Sidebar */}
      <aside
        className={`sidebar-container ${isOpen ? "open" : "closed"}`}
        aria-hidden={!isOpen}
      >
        {/* Top Section */}
        <div className="sidebar-top">
          {isOpen && (
            <div className="logo">
              <img src={IdeaSlidePNG} alt="IdeaSlide Logo" className="logo-img" />
            </div>
          )}

          <button
            className="toggle-btn"
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isOpen}
          >
            <BsLayoutSidebar className="slider-icon" size={18} color="#afafaf" />
          </button>
        </div>

        {isOpen && (
          <>
            <div className="recent-chats">
              {/* New Chat Button */}
              <button className="new-chat-btn" onClick={startNewChat}>
                <SlNote size={16} />
                <span>New Chat</span>
              </button>

              <h3 className="recent-chats-heading">Recent Chats</h3>

              <div className="chats-list">
                {recentChats.map((chat) => (
                  <div key={chat.id} className="chat-item">
                    <span className="chat-name">{chat.name}</span>

                    <button
                      className="delete-btn"
                      onClick={() => deleteChat(chat.id)}
                      aria-label={`Delete ${chat.name}`}
                    >
                      <span className="delete-icon">×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom User Section */}
            <div className="user-section">
              <div className="avatar" aria-hidden="true">👤</div>
              <span className="username">John Doe</span>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
