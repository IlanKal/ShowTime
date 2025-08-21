import React from "react";
import './IntroSection.css';
import Logo from "../../../../assets/logo.png"

const IntroSection: React.FC = () => {
  return (
    <div className="intro-section">
      <a href="/" className="logo-link"><img src={Logo} alt="Logo" /></a>
      <p className="intro-tagline">
        Your premier destination for discovering new films and series based on your unique personality and tastes.
      </p>
      <div className="why-us-container">
        <div className="features-list">
          <div className="feature-item">
            <h3 className="feature-title">The Hottest Trends</h3>
            <p className="feature-description">
              Get instant access to the hottest trends and blockbusters from all streaming giants, all in one place. No more switching apps.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">The Perfect Recommendation</h3>
            <p className="feature-description">
              Our system learns your preferences and tastes to recommend new content you'll genuinely love. It's like having a personal movie critic.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">The Ultimate Watchlist</h3>
            <p className="feature-description">
              Keep track of your "To-Watch" list. Save content for later and build your ultimate cinematic universe.
            </p>
          </div>
        </div>
      </div> 

    </div>
  );
};

export default IntroSection;