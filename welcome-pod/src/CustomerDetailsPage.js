import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CustomerDetailsPage.css';
import hotelName from './assets/hotel-logo.jpg';

const CustomerDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customerDetails = location.state || {};

  //Function to handle the "Back" button click 
  const handleBack = () => {
    navigate('/check-in-method'); //navigate back to the checkinmethod page
  };

  const handleCancel = () => {
    navigate('/');
  }

  const handleCallStaff = () => {
    alert('Calling Staff - Functionality Not Implemented');
  };

  const handleConfirm = () => {
    navigate('/loading2');
  };

  return (
    <div className="customer-details-container">
      <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
      <h1>Please confirm guest before proceeding</h1>
      <div className="details-box">
        {customerDetails.bookingNumber ? (
          <div className="details-section">
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
      <div className="button-row">
        <button onClick={handleBack} className="back-button">Back</button>
        <button onClick={handleCancel} className="cancel-button">Cancel</button>
        <button onClick={handleConfirm} className="confirm-button">Confirm</button>
        <button onClick={handleCallStaff} className="call-staff-button">Call Staff</button>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
