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
      navigate('/dispenser', { state: location.state }); // route to dispenser page
    }, 4000); // 4 seconds 

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
