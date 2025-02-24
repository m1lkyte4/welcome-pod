import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate fetching customer details
    const customerDetails = {
      name,
      bookingNumber,
      checkInDate: '2023-02-20',
      checkOutDate: '2023-02-25',
      numberOfGuests: 2,
      roomNumber: '101',
    };

    navigate('/customer-details', { state: customerDetails });
  };

  return (
    <div>
      <h1>Check In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <br />
        <label>
          Booking Number:
          <input
            type="text"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            placeholder="Enter your booking number"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
