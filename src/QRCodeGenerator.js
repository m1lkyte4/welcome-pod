import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ bookingNumber }) => {
    const [bookingData, setBookingData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://welcom3p0d.netlify.app/.netlify/functions/database/${bookingNumber}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBookingData(data);

                const qrData = `Booking Number: ${data.bookingNumber}, Check-in Date: ${data.checkInDate}, Room Number: ${data.roomNumber}`;
                setQrCode(qrData);
                setIsLoading(false); // Set isLoading to false after fetching data
            } catch (error) {
                console.error('Error fetching booking data:', error);
                setError(error);
                setBookingData(null);
                setQrCode(null);
                setIsLoading(false); // Set isLoading to false on error
            }
        };

        fetchData();
    }, [bookingNumber]);

    if (isLoading) {
        return <p>Loading booking data...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
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
    );
};

export default QRCodeGenerator;
