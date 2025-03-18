import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CustomerDetailsPage.css';
import hotelName from './assets/hotel-logo.jpg';

const CustomerDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract the customer ID from the URL
    const [customerDetails, setCustomerDetails] = useState({});
    const [error, setError] = useState(null);

    // Function to format the date
    const formatDate = (dateString) => {
        if (!dateString) return 'No Date Provided';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id) { // Check if there's a valid ID in the URL
                setError(null);
                try {
                    const response = await fetch(`https://welcom3p0d.netlify.app/.netlify/functions/database/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCustomerDetails(data);
                } catch (error) {
                    console.error("Error fetching booking data:", error);
                    setError("Failed to fetch booking data. Please check the booking number.");
                    setCustomerDetails({});
                }
            }
        };
        fetchData();
    }, [id]); // Dependency on `id` to re-fetch when it changes

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
