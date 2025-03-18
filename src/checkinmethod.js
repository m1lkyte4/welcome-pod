import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckInMethod.css'; // Import CSS for styling

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
            <img src="/hotel-logo.jpg" alt="Floresta Hotel" className="hotel-logo" />
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
                <img src="/kiosk-logo.jpg" alt="Kiosk Logo" className="kiosk-logo" />
            </div>
        </div>
    );
};

export default CheckInMethod;
