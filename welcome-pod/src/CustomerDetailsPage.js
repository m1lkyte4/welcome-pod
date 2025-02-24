import React from 'react';
import { useLocation } from 'react-router-dom';
import './CustomerDetailsPage.css';

const CustomerDetailsPage = () => {
  const location = useLocation();
  const customerDetails = location.state || {};

  return (
    <div className="customer-details-container">
      <h1>Customer Details</h1>
      {customerDetails.name ? (
        <div className="details-section">
          <p><strong>Name:</strong> {customerDetails.name}</p>
          <p><strong>Booking ID:</strong> {customerDetails.bookingNumber}</p>
          <p><strong>Check-in Date:</strong> {customerDetails.checkInDate}</p>
          <p><strong>Check-out Date:</strong> {customerDetails.checkOutDate}</p>
          <p><strong>Number of Guests:</strong> {customerDetails.numberOfGuests}</p>
          <p><strong>Room Number:</strong> {customerDetails.roomNumber}</p>
        </div>
      ) : (
        <p>No customer details available.</p>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
