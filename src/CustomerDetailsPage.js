import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CustomerDetailsPage.css';
import hotelName from './assets/hotel-logo.jpg';
import { Html5Qrcode } from "html5-qrcode";

const CustomerDetailsPage = () => {
  const [scanResult, setScanResult] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const customerDetails = location.state || {};
  const [scanning, setScanning] = useState(false); // Track if scanning is active
  const [error, setError] = useState(null); // State for scanning errors

  // Function to format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return 'Invalid Date'; // Return a default value for invalid dates
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return 'Invalid Date'; // Return a default value if an error occurs
    }
  };

  useEffect(() => {
    let html5QrCode;

    const startScanning = () => {
        setScanning(true); // Set scanning to true when starting
        setError(null); // Clear any previous errors

        html5QrCode = new Html5Qrcode("reader");

        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            try {
                const bookingData = JSON.parse(decodedText);
                // Validate bookingData structure
                if (!bookingData.bookingNumber || !bookingData.checkInDate || !bookingData.checkOutDate || !bookingData.numberOfGuests || !bookingData.roomNumber) {
                    throw new Error("Incomplete booking data in QR code");
                }
                // Update the customerDetails state with the parsed data
                setCustomerDetails(bookingData);
                setScanResult(decodedText); // Store the raw scanned data

                // Stop scanning after successful scan
                html5QrCode.stop();
                setScanning(false); // Set scanning to false after success
            } catch (err) {
                console.error("Error processing QR code data:", err);
                setError("Invalid QR Code format or data");
                setCustomerDetails({}); // Clear customer details on error
                setScanResult('');
                if (html5QrCode && html5QrCode.getState() !== Html5Qrcode.SCANNING_STATE_NOT_SCANNING) {
                    html5QrCode.stop(); // Ensure scanner is stopped
                    setScanning(false);
                }
            }
        };

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback,
            (errorMessage) => {
                // Handle errors
                console.warn(`QR code scan error = ${errorMessage}`);
            })
            .catch((err) => {
                console.error(`Unable to start scanning, error: ${err}`);
                setError("Failed to start scanning. Please check camera permissions.");
                setScanning(false);
            });
    };


    if (scanning) {
        startScanning();
    }

    return () => {
        // Ensure scanning is stopped on unmount
        if (html5QrCode && html5QrCode.getState() !== Html5Qrcode.SCANNING_STATE_NOT_SCANNING) {
            html5QrCode.stop().catch((err) => console.log("Failed to stop scanning"));
        }
        setScanning(false);
    };
  }, [scanning]); // Depend on scanning state

  //Function to handle the "Back" button click 
  const handleBack = () => {
    navigate('/check-in-method'); //navigate back to the checkinmethod page
  };

  const handleCancel = () => {
    navigate('/');
  }

  const handleCallStaff = () => {
    navigate('/call-staff');
  };

  const handleConfirm = () => {
    navigate('/loading2');
  };

  const handleScanBarcodeClick = () => {
    // Start scanning when the button is clicked
    if (!scanning) {
        setScanning(true);
    }
  };
  
  return (
    <div className="customer-details-container">
      <img src={hotelName} alt="Floresta Hotel" className="hotel-logo" />
      <h1>Please confirm guest before proceeding</h1>
      <button onClick={handleScanBarcodeClick} className="scan-barcode-button" disabled={scanning}>
                {scanning ? 'Scanning...' : 'Scan Barcode'}
            </button>

            {scanning && <div id="reader" width="600px"></div>} {/* Show reader when scanning */}
            {error && <p className="error-message">Error: {error}</p>} {/*Display error if any*/}

      <div className="details-box">
        {customerDetails.bookingNumber ? (
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
        <button onClick={handleBack} className="back-button">Back</button>
        <button onClick={handleCancel} className="cancel-button">Cancel</button>
        <button onClick={handleConfirm} className="confirm-button">Confirm</button>
        <button onClick={handleCallStaff} className="call-staff-button">Call Staff</button>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
