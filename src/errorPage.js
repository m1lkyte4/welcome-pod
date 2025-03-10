import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './errorPage.css';
import hotelName from './assets/hotel-logo.jpg';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to redirect to the homepage after 10 seconds
    const timeoutId = setTimeout(() => {
      navigate('/'); // Navigate to the homepage
    }, 5000); // 10000 milliseconds = 10 seconds

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="error-page-container">
      <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
      <div className="error-message-box">
        <div className="error-icon">!</div>
        <h2>Oops...</h2>
        <p>We could not find your booking in our database.</p>
        <p> Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default ErrorPage;
