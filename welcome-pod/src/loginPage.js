import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';
import hotelName from './assets/hotel-logo.jpg';
//import CustomerDetailsPage from './CustomerDetailsPage';


const LoginPage = () => {
  //const [name, setName] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/api/bookings/${bookingNumber}`);
      const customerDetails = response.data;

      if (customerDetails) {
          // Create a serializable copy of customerDetails
          const serializableDetails = {
            bookingNumber: customerDetails.bookingNumber,
            checkInDate: customerDetails.checkInDate,
            checkOutDate: customerDetails.checkOutDate,
            numberOfGuests: customerDetails.numberOfGuests,
            roomNumber: customerDetails.roomNumber,
        };
        

          navigate('/loading', { state: serializableDetails });
      } else {
          alert('Booking number not found.');
      }
  } catch (error) {
      console.error('Error fetching booking details:', error);
      alert('An error occurred. Please try again.');
  }
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
