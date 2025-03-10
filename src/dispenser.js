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
      // After displaying the "Card Dispensed" message for a few seconds, 
      // you might want to redirect to a "thank you" or "start over" page.
      // For now, it doesn't redirect anywhere to prevent confusion.
      //navigate('/thank-you');  // Replace '/thank-you' with your desired route
    }, 5000); //5 seconds.
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
