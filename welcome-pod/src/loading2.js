import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './loading2.css';
import hotelName from './assets/hotel-logo.jpg'; // Import your hotel logo

const Loading2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate dispensing room card
    const timer = setTimeout(() => {
      // After dispensing, navigate to a confirmation page
      // TODO: Create a confirmation page, if necessary
      navigate('/dispenser', { state: location.state }); // or wherever it needs to go after this page
    }, 5000); // 5 seconds (adjust as needed)

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="loading2-container">
      <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
      <h1>Your room card is being dispensed. Please wait.</h1>
      <div className="spinner">
        <span class="loader"></span>
      </div>
    </div>
  );
};

export default Loading2;
