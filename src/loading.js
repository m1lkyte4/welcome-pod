import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './loading.css';
import hotelName from './assets/hotel-logo.jpg'; // Import your hotel logo
import hotelLobby from './assets/hotel-lobby.jpg'; // Import the hotel lobby image

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate a loading process (e.g., fetching data)
    const timer = setTimeout(() => {
      // After the loading process, navigate to the customer details page
      if (location.state) { // Check if location.state exists
        navigate('/customer-details', { state: location.state });
      } else {
        // Handle the case where location.state is null (e.g., redirect to an error page)
        console.error("No customer details received!");
        navigate('/error'); // Or navigate to an appropriate error page
      }
    }, 3000); // 3 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="loading-page-container" style={{ backgroundImage: `url(${hotelLobby})` }}>
      <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
      <h1>Loading...</h1>
      <p>Retrieving your booking details...</p>
    </div>
  );
};

export default LoadingPage;
