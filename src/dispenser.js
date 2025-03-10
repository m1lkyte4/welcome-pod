import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dispenser.css';
import hotelLogo from './assets/hotel-logo.jpg'; // Import your hotel logo
import checkmark from './assets/checkmark.webp'; // Import your checkmark image


const Dispenser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // You can add an optional delay before navigating
    const timer = setTimeout(() => {
      navigate('/');  // reroute to homepage screen 
    }, 5000); // reroute-ing to homepage in 5 seconds.
  }, []);

  return (
    <div className="dispenser-container">
      <img src={hotelLogo} alt="Hilton Hotel Logo" className="hotel-logo" />
      <img src={checkmark} alt="Checkmark" className="checkmark" />
      <h1>Card Dispensed.</h1>
      <p>We hope you have a wonderful stay.</p>
    </div>
  );
};

export default Dispenser;
