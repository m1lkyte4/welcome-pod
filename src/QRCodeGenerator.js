// src/QRCodeGenerator.js
import React, { useState, useEffect } from 'react';
import { QRCode } from 'qrcode.react';  // ✅ Correct

const QRCodeGenerator = ({ bookingNumber }) => {
    const [bookingData, setBookingData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            setError(null); // Clear any previous errors
            
            try {
                //const response = await fetch(`http://localhost:5000/bookings/${bookingNumber}`);
                const netlifyFunctionPath = '/api/database';
                const response = await fetch(netlifyFunctionPath);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBookingData(data);

                // Format the data for the QR code
                const qrData = `Booking Number: ${data.bookingNumber}, Check-in Date: ${data.checkInDate}, Room Number: ${data.roomNumber}`;
                setQrCode(qrData);

            } catch (error) {
                console.error('Error fetching booking data:', error);
                setBookingData(null);
                setQrCode(null);
            }
        };

        fetchData();
    }, [bookingNumber]);

    // Conditionally render based on loading and error states
    if (isLoading) {
        return <p>Loading booking data...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            {bookingData ? (
                <div>
                    <h3>Booking Details</h3>
                    <p>Booking Number: {bookingData.bookingNumber}</p>
                    <p>Check-in Date: {bookingData.checkInDate}</p>
                    <p>Room Number: {bookingData.roomNumber}</p>
                    {qrCode && (
                        <div>
                            <h3>QR Code</h3>
                            <QRCode value={qrCode} size={256} level="H" />
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading booking data...</p>
            )}
        </div>
    );
};

export default QRCodeGenerator;
