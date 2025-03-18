import React from "react";
import { useNavigate } from "react-router-dom";
import "./cdp2.css";
import hotelName from './assets/hotel-logo.jpg';

const mockBookingData = {
  bookingId: "100014",
  checkInDate: "2025-03-19",
  checkOutDate: "2025-03-22",
  guests: 2,
  roomNumber: 302,
};

const cdp2 = () => {
    const navigate = useNavigate();
  return (
    <div className="dupe-container">
      <img className={hotelName} src="/floresta-logo.png" alt="Floresta Hotel" />
      <h2>Please confirm guest details before proceeding</h2>

      <div className="booking-box">
        <p><strong>Booking ID:</strong> {mockBookingData.bookingId}</p>
        <p><strong>Check-in Date:</strong> {mockBookingData.checkInDate}</p>
        <p><strong>Check-out Date:</strong> {mockBookingData.checkOutDate}</p>
        <p><strong>Number of Guests:</strong> {mockBookingData.guests}</p>
        <p><strong>Room Number:</strong> {mockBookingData.roomNumber}</p>
      </div>

      <div className="button-container">
        <button onClick={() => navigate('/check-in-method')} className="back-button">Back</button>
        <button onClick={() => navigate('/')} className="cancel-button">Cancel</button>
        <button onClick={() => navigate('/loading2')} className="confirm-button">Confirm</button>
        <button onClick={() => navigate('/call-staff')} className="call-staff-button">Call Staff</button>
      </div>
    </div>
  );
};

export default cdp2;
