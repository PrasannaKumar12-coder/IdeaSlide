import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { ReactTyped } from "react-typed";

import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";

const Home = () => {
  const features = [
    {
      icon: "🎨",
      title: "AI-Powered Slides",
      desc: "Create stunning presentations with AI in seconds",
    },
    {
      icon: "🤖",
      title: "Smart Assistant",
      desc: "Real-time suggestions and improvements",
    },
    {
      icon: "⚡",
      title: "Fast Generation",
      desc: "Generate professional slides instantly",
    },
    {
      icon: "🎯",
      title: "Multiple Formats",
      desc: "Presentation, Speech, Summary, Email, Blog, Notes",
    },
    {
      icon: "💼",
      title: "Professional Templates",
      desc: "100+ ready-to-use templates",
    },
    { icon: "🌍", title: "Multi-language", desc: "Support for 50+ languages" },
    {
      icon: "📊",
      title: "Data Visualization",
      desc: "Charts and graphs automation",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      desc: "Your data is always protected",
    },
  ];

  const formats = [
    "Presentation Slides",
    "Speech Script",
    "Seminar Summary",
    "Email Format",
    "Blog Post",
    "Study Notes",
    "Poster Text",
    "Report Writing",
  ];

  return (
    <div className="home">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Ideas into{" "} <br />
              <span id="gradient-text">
                <ReactTyped
                  strings={[
                    "Stunning Presentations",
                    "Professional Notes",
                    "Engaging Speeches",
                    "Creative Emails",
                    "Insightful Blogs",
                  ]}
                  typeSpeed={80}
                  backSpeed={40}
                  backDelay={1500}
                  loop
                />
              </span>
            </h1>

            <p className="hero-description">
              Create professional slides, speeches, and content in seconds with
              AI. Perfect for classes, meetings, seminars, and business
              presentations.
            </p>

            <div className="hero-buttons">
              <Link to="/chat" className="btn btn-primary">
                Create Slides Now
              </Link>
              <Link to="/chat" className="btn btn-secondary">
                Try AI Assistant
              </Link>
            </div>
          </div>

          {/* Visual side cards */}
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-header">
                <span className="card-dot red"></span>
                <span className="card-dot yellow"></span>
                <span className="card-dot green"></span>
              </div>
              <div className="card-content">
                <h3>Black Money in India</h3>
                <p>Presentation for Class</p>
              </div>
            </div>

            <div className="floating-card card-2">
              <div className="card-header">
                <span className="card-dot red"></span>
                <span className="card-dot yellow"></span>
                <span className="card-dot green"></span>
              </div>
              <div className="card-content">
                <h3>Business Meeting</h3>
                <p>Quarterly Review</p>
              </div>
            </div>

            <div className="floating-card card-3">
              <div className="card-header">
                <span className="card-dot red"></span>
                <span className="card-dot yellow"></span>
                <span className="card-dot green"></span>
              </div>
              <div className="card-content">
                <h3>Seminar Summary</h3>
                <p>AI Technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="why-choose-us">
        <div className="container">
          <h2>Why Choose SlideGenius?</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature">
                <div className="f-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="formats" id="supported-formats">
        <div className="container">
          <h2>Supported Formats</h2>
          <div className="formats-grid">
            {formats.map((format, i) => (
              <div key={i} className="format-item">
                <span>✓</span> {format}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="works" id="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Enter Topic</h3>
              <p>Describe your presentation needs</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Choose Format</h3>
              <p>Select output type and style</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Generate</h3>
              <p>Get AI-powered content instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Create Amazing Presentations?</h2>
          <p>Join thousands of students and professionals</p>
          <Link to="/chat" className="btn-glass">
            🚀 Start Creating Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>SlideGenius AI</h3>
              <p>
                Transforming ideas into professional presentations with AI
                power.
              </p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <Link to="/slides" className="footer-link">
                  Create Slides
                </Link>
                <Link to="/chat" className="footer-link">
                  AI Assistant
                </Link>
                <Link to="/" className="footer-link">
                  Templates
                </Link>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <Link to="/" className="footer-link">
                  About
                </Link>
                <Link to="/" className="footer-link">
                  Careers
                </Link>
                <Link to="/" className="footer-link">
                  Contact
                </Link>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <Link to="/" className="footer-link">
                  Help Center
                </Link>
                <Link to="/" className="footer-link">
                  Privacy
                </Link>
                <Link to="/" className="footer-link">
                  Terms
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 SlideGenius AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
