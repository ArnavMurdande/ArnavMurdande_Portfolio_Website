// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import githubStatic from '../assets/images/icons8-github-48.png';
import githubAnim from '../assets/images/icons8-github-48.apng';
import linkedinStatic from '../assets/images/icons8-linkedin-48.png';
import linkedinAnim from '../assets/images/icons8-linkedin-48.apng';
import resumePdf from '../assets/docs/Arnav Murdande Resume(Software Engineer).pdf';

const Navbar = ({ onLogoClick }) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false })
  );
  // live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="floating-nav" id="navbar">

      <div className="nav-content">
        <div className="nav-left">
          {/* AM logo → delegated click handler */}
          <a
            href="/"
            className="logo"
            onClick={(e) => {
              if (onLogoClick) onLogoClick(e);
            }}
          >
            AM
          </a>
          <div className="timer">{time}</div>
        </div>

        <div className="nav-right">
          <div className="social-group">
            <a
              href="https://github.com/ArnavMurdande"
              target="_blank"
              className="social-btn social-logo-container"
              rel="noreferrer"
            >
              <span className="social-img-wrap">
                <img className="social-static" src={githubStatic} alt="GitHub" />
                <img className="social-animated" src={githubAnim} alt="" />
              </span>
            </a>
            <a
              href="https://linkedin.com/in/arnav-murdande-235b5331a/"
              target="_blank"
              className="social-btn social-logo-container"
              rel="noreferrer"
            >
              <span className="social-img-wrap">
                <img
                  className="social-static"
                  src={linkedinStatic}
                  alt="LinkedIn"
                />
                <img className="social-animated" src={linkedinAnim} alt="" />
              </span>
            </a>
          </div>

          <a
            href={resumePdf}
            target="_blank"
            className="resume-btn"
            rel="noreferrer"
          >
            <div className="btn-content">
              <span className="btn-text">Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                className="icon-svg"
              >
                <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
              </svg>
            </div>
            <div className="marquee-overlay">
              <div className="marquee-track">
                <span>
                  BORRRRING!!!! TRY EXPLORING MORE &nbsp;&bull;&nbsp;{' '}
                </span>
                <span>
                  BORRRRING!!!! TRY EXPLORING MORE &nbsp;&bull;&nbsp;{' '}
                </span>
              </div>
            </div>
          </a>

          {/* Themes button + dropdown removed as requested */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
