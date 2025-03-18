import React from 'react';
import { useNavigate } from 'react-router-dom';
import './checkinmethod.css'; 
import hotelName from './assets/hotel-logo.jpg';
import kioskLogo from './assets/kiosk-logo.webp';

const CheckInMethod = () => {
    const navigate = useNavigate();

    const handleEnterBookingNumber = () => {
        navigate('/login'); // Navigate to a separate page for entering the booking number
    };

    const handleScanBarcode = () => {
        navigate('/scan-barcode'); // Navigate to the CustomerDetailsPage for barcode scanning
    };

    return (
        <div className="check-in-container">
            <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
            <h1>We need to retrieve your booking details. How would you like it to be done?</h1>
            <div className="button-container">
                <button onClick={handleEnterBookingNumber} className="check-in-button">
                    Enter Booking Number
                </button>
                <button onClick={handleScanBarcode} className="check-in-button">
                    Scan Barcode
                </button>
            </div>
            <div className="kiosk-footer">
                <span>KIOSK DEVELOPED BY:</span>
                <img src={kioskLogo} alt="Kiosk Logo" className="kiosk-logo" />
            </div>
        </div>
    );
};

export default CheckInMethod;
