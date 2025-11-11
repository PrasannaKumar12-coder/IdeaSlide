import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Open Popup Button */}
      <button onClick={() => setIsOpen(true)} className="open-btn">
        Open Popup
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Popup Title</h2>
            <p>This is a simple popup window.</p>

            <button onClick={() => setIsOpen(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
