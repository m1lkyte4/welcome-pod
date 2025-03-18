import React from 'react';
import { Link } from 'react-router-dom';
import './checkinmethod.css';
import kioskLogo from './assets/kiosk-logo.webp';
import hotelName from './assets/hotel-logo.jpg'; 
import QRCodeGenerator from './QRCodeGenerator';

const CheckInMethodPage = () => {
  // Hardcoded booking number for demonstration
  const bookingNumber = '100001';

  return (
    <div className="check-in-method-container">
      <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
      <h2>We need to retrieve your booking details. How would you like it to be done?</h2>
      <Link to="/login" className="check-in-button">Enter Booking Number</Link>
      <Link to="/scan-barcode" className="check-in-button">Scan Barcode</Link>
      {/* Generate QR code dynamically */}
      <QRCodeGenerator bookingNumber={bookingNumber} />
      <div className="kiosk-info">
        <p>KIOSK DEVELOPED BY:</p>
        <img src={kioskLogo} alt="Kiosk Logo" />
      </div>
    </div>
  );
};

export default CheckInMethodPage;
