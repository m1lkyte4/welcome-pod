import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerDetailsPage.css';
import hotelName from './assets/hotel-logo.jpg';

const CustomerDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [customerDetails, setCustomerDetails] = useState({});
    const [error, setError] = useState(null);

    const bookingNumberFromCheckIn = location.state?.bookingNumber;

    // Function to format the date
    const formatDate = (dateString) => {
        if (!dateString) return 'No Date Provided';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString().split('T')[0];
    };

    useEffect(() => {
      const fetchData = async () => {
          if (bookingNumberFromCheckIn) {
              setError(null);
  
              // Simulate API response delay
              await new Promise(resolve => setTimeout(resolve, 1000));
  
              // Mock data for testing
              const mockData = {
                  bookingNumber: bookingNumberFromCheckIn,
                  checkInDate: "2025-03-19",
                  checkOutDate: "2025-03-22",
                  numberOfGuests: 2,
                  roomNumber: "302"
              };
  
              setCustomerDetails(mockData);
          } else {
              setError("No booking number provided.");
          }
      };
  
      fetchData();
  }, [bookingNumberFromCheckIn]);
  
  

    return (
        <div className="customer-details-container">
            <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
            <h1>Please confirm guest before proceeding</h1>

            <div className="details-box">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : customerDetails.bookingNumber ? (
                    <div className="details-section">
                        <p><strong>Booking ID:</strong> {customerDetails.bookingNumber}</p>
                        <p><strong>Check-in Date:</strong> {formatDate(customerDetails.checkInDate)}</p>
                        <p><strong>Check-out Date:</strong> {formatDate(customerDetails.checkOutDate)}</p>
                        <p><strong>Number of Guests:</strong> {customerDetails.numberOfGuests}</p>
                        <p><strong>Room Number:</strong> {customerDetails.roomNumber}</p>
                    </div>
                ) : (
                    <p>No customer details available.</p>
                )}
            </div>

            <div className="button-row">
                <button onClick={() => navigate('/check-in-method')} className="back-button">Back</button>
                <button onClick={() => navigate('/')} className="cancel-button">Cancel</button>
                <button onClick={() => navigate('/loading2')} className="confirm-button">Confirm</button>
                <button onClick={() => navigate('/call-staff')} className="call-staff-button">Call Staff</button>
            </div>
        </div>
    );
};

export default CustomerDetailsPage;
