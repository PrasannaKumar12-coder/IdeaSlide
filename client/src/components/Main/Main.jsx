import React, { useState, useRef, useEffect } from "react";
import ChatNavbar from "../ChatNavbar/ChatNavbar";
import "./Main.css";

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [inputText]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const formatOptions = [
    "Presentation",
    "Speech",
    "Seminar Summary",
    "Email Format",
    "Blog",
    "Notes",
    "Poster Text",
  ];

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleSend = () => {
    if (inputText.trim() === "") return;

    if (showWelcome) {
      setShowWelcome(false);
    }

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `This is an AI response to: "${inputText}"${
          selectedFormat ? `\n\nFormat: ${selectedFormat}` : ""
        }`,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInputText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setShowFormatMenu(false);
  };

  const removeFormat = () => {
    setSelectedFormat(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const speakText = (text, messageId) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking === messageId) {
        window.speechSynthesis.cancel();
        setIsSpeaking(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(messageId);
    }
  };

  const regenerateResponse = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `This is a regenerated AI response${
          selectedFormat ? `\n\nFormat: ${selectedFormat}` : ""
        }`,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="main-wrapper">
      {/* <ChatNavbar /> */}

      <div className="main-container">
        {/* Messages Area */}
        <div className="messages-area">
          <div className="messages-content">
            {/* Welcome Message */}
            {showWelcome && (
              <div className="welcome-section">
                <h1 className="welcome-message">How can I help you today?</h1>
              </div>
            )}

            {/* Chat Messages */}
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-wrapper ${
                    message.isUser ? "message-user" : "message-ai"
                  }`}
                >
                  {/* Message Content */}
                  <div className="message-content-wrapper">
                    <div
                      className={`message-bubble ${
                        message.isUser ? "bubble-user" : "bubble-ai"
                      }`}
                    >
                      <p className="message-text">{message.text}</p>
                    </div>

                    {/* AI Message Actions */}
                    {!message.isUser && (
                      <div className="message-actions">
                        <button
                          onClick={() => copyToClipboard(message.text)}
                          className="action-btn"
                          title="Copy"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              strokeWidth="2"
                            />
                            <path
                              d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
                              strokeWidth="2"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => speakText(message.text, message.id)}
                          className={`action-btn ${
                            isSpeaking === message.id ? "action-speaking" : ""
                          }`}
                          title="Speak"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => regenerateResponse(message.id)}
                          className="action-btn"
                          title="Regenerate"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M2 10V4"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M2 10H8"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            {/* Format Tag */}
            {selectedFormat && (
              <div className="format-tag-wrapper">
                <div className="format-tag">
                  <span className="format-label">Format:</span>
                  <span className="format-value">{selectedFormat}</span>
                  <button onClick={removeFormat} className="format-remove">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Input Box */}
            <div className="input-box">
              <div className="input-wrapper">
                {/* Row 1: Text Input */}
                <textarea
                  autoFocus
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Assistant..."
                  rows={1}
                  className="input-textarea"
                />

                {/* Row 2: Controls */}
                <div className="input-controls">
                  {/* Left: Plus/Format Button */}
                  <button
                    onClick={() => setShowFormatMenu(!showFormatMenu)}
                    className={`input-btn btn-format ${
                      showFormatMenu ? "btn-active" : ""
                    }`}
                    title="Select format"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>

                  {/* Right: Mic and Send Buttons */}
                  <div className="input-actions">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`input-btn btn-mic ${
                        isListening ? "btn-listening" : ""
                      }`}
                      title={isListening ? "Stop listening" : "Voice input"}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={handleSend}
                      disabled={!inputText.trim()}
                      className="input-btn btn-send"
                      title="Send message"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Format Menu */}
              {showFormatMenu && (
                <>
                  <div
                    className="menu-overlay"
                    onClick={() => setShowFormatMenu(false)}
                  />
                  <div className="format-menu">
                    <div className="format-menu-header">
                      <h4 className="format-menu-title">Response Format</h4>
                    </div>
                    <div className="format-menu-list">
                      {formatOptions.map((format) => (
                        <button
                          key={format}
                          onClick={() => handleFormatSelect(format)}
                          className={`format-menu-item ${
                            selectedFormat === format ? "format-selected" : ""
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Helper Text */}
            <p className="input-helper">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
