import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Welcome to Hilton Hotel</h1>
      <Link to="/login" className="check-in-button">Check-in here</Link>
    </div>
  );
};

export default HomePage;
