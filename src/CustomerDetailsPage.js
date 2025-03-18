import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerDetailsPage.css';
import hotelName from './assets/hotel-logo.jpg';
import { Html5Qrcode } from "html5-qrcode";

const CustomerDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [customerDetails, setCustomerDetails] = useState({});
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState(null);
    const [isManualNumberEntry, setIsManualNumberEntry] = useState(false);

    const bookingNumberFromCheckIn = location.state?.bookingNumber;

    // Function to format the date
    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'No Date Provided';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error("Invalid date:", dateString);
                return 'Invalid Date';
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (error) {
            console.error("Error formatting date:", dateString, error);
            return 'Invalid Date';
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            if (bookingNumberFromCheckIn) {
                // If booking number is provided from the check-in page, fetch the data
                setIsManualNumberEntry(true);  // set it to true when the number is provided
                setError(null);
                try {
                    const response = await fetch(`https://welcom3p0d.netlify.app/.netlify/functions/database/${bookingNumberFromCheckIn}`);
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
    }, [bookingNumberFromCheckIn]);

    useEffect(() => {
        let html5QrCode;

        const startScanning = () => {
            setScanning(true);
            setError(null);

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

                    // Stop scanning after successful scan
                    html5QrCode.stop();
                    setScanning(false);
                } catch (err) {
                    console.error("Error processing QR code data:", err);
                    setError("Invalid QR Code format or data");
                    setCustomerDetails({});
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

        if (scanning && !isManualNumberEntry)  { // do not start scan if booking number is available and it is manual
            startScanning();
        }

        return () => {
            // Ensure scanning is stopped on unmount
            if (html5QrCode && html5QrCode.getState() !== Html5Qrcode.SCANNING_STATE_NOT_SCANNING) {
                html5QrCode.stop().catch((err) => console.log("Failed to stop scanning"));
            }
            setScanning(false);
        };
    }, [scanning, isManualNumberEntry]);

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
                        <p><strong>Check-out Date:</strong> {formatDate(customerDetails.checkOutDate}</p>
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
