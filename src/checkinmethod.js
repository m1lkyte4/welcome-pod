import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h1>We need to retrieve your booking details. How would you like it to be done?</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Booking Number"
                    value={bookingNumber}
                    onChange={handleBookingNumberChange}
                />
                <button onClick={handleEnterBookingNumber}>Enter Booking Number</button>
            </div>
            <button onClick={handleScanBarcode}>Scan Barcode</button>
        </div>
    );
};

export default CheckInMethod;
