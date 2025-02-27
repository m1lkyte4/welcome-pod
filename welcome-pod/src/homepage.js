import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import hotelLobby from './assets/hotel-lobby.jpg';
import kioskLogo from './assets/kiosk-logo.webp';
import igIcon from './assets/ig-logo.jpg';
import fbIcon from './assets/fb-logo.png';
import hotelName from './assets/hotel-logo.jpg';


const HomePage = () => {
  return (
    <div className="home-page-container" style={{ backgroundImage:`url(${hotelLobby})`}}>
      <div className="social-icons">
        <p>Follow our Page:</p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={igIcon} alt="Instagram" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={fbIcon} alt="Facebook" />
        </a>
      </div>
      <img src={hotelName} alt="Floresta Hotel" className='hotel-logo' />
      <Link to="/check-in-method" className="check-in-button">Check-in here</Link>
      <div className="kiosk-info">
        <p>KIOSK DEVELOPED BY:</p>
        <img src={kioskLogo} alt="Kiosk Logo" />
      </div>
    </div>
  );
};

export default HomePage;
