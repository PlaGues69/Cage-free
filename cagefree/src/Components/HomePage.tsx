import React from 'react';
import './HomePage.css';
import pawImage from '../assets/paw.png'; // Adjust path as needed
import backgroundImage from '../assets/dog4.jpg'; // Import the background image

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Dog Care Center</h1>
          <p>Your trusted partner in dog care and training.</p>
          <a href="#services" className="cta-button">Our Services</a>
        </div>
        <div className="hero-animation">
          <div className="paw-prints">
            <div className="paw-print">
              <img src={pawImage} alt="Paw Print" />
            </div>
            <div className="paw-print">
              <img src={pawImage} alt="Paw Print" />
            </div>
            <div className="paw-print">
              <img src={pawImage} alt="Paw Print" />
            </div>
            <div className="paw-print">
              <img src={pawImage} alt="Paw Print" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
