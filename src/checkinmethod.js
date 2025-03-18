import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckInMethod.css'; // Import the CSS file

const CheckInMethod = () => {
    const navigate = useNavigate();
    const [bookingNumber, setBookingNumber] = useState('');

    const handleEnterBookingNumber = () => {
        if (bookingNumber.trim() !== '') {
            // Navigate to the CustomerDetailsPage with the booking number
            navigate('/customer-details', { state: { bookingNumber: bookingNumber } });
        } else {
            // Handle the case where the booking number is empty
            alert('Please enter a booking number.');
        }
    };

    const handleScanBarcode = () => {
        navigate('/customer-details'); // Navigate to the CustomerDetailsPage
    };

    const handleBookingNumberChange = (event) => {
        setBookingNumber(event.target.value);
    };

    return (
        <div className="check-in-container">
            <img src="/hotel-logo.jpg" alt="Floresta Hotel" className="hotel-logo" /> {/* Hotel Logo */}
            <h1>We need to retrieve your booking details. How would you like it to be done?</h1>
            <button onClick={handleEnterBookingNumber} className="enter-booking-button">Enter Booking Number</button>
            <button onClick={handleScanBarcode} className="scan-barcode-button">Scan Barcode</button>
            <div className="kiosk-dev">KIOSK DEVELOPED BY: </div>
            <div className="kiosk-logo">Kiosk Logo</div>
        </div>
    );
};

export default CheckInMethod;
