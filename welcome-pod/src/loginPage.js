import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import hotelName from './assets/hotel-logo.jpg';
//import hotelLobby from './assets/hotel-lobby.jpg';
//import kioskLogo from './assets/kiosk-logo.webp';

const LoginPage = () => {
  //const [name, setName] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate fetching customer details
    const customerDetails = {
      //name,
      bookingNumber: bookingNumber,
      checkInDate: '2023-02-20',
      checkOutDate: '2023-02-25',
      numberOfGuests: 2,
      roomNumber: '101',
    };

    navigate('/loading', { state: customerDetails });
  };

  return (
    <div>
      <div className='login-page-container' >
          <img src={hotelName} alt="Floresta Hotel" className='hotel-logo' />
      </div>
      <h1>Enter your 6-character Booking Number and click Confirm</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Booking Number:
          <input
            type="text"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            placeholder="Enter your Booking Number"
          />
        </label>
        <br />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default LoginPage;
