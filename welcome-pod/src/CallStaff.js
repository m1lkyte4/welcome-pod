import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CallStaff.css';
import hotelName from './assets/hotel-logo.jpg'; // Assuming you have a hotel logo

const CallStaff = () => {
    const navigate = useNavigate();

    // Function to handle going back to customer details page
    const handleBack = () => {
        navigate('/'); // reroute to homepage
    };

    return (
        <div className="call-staff-container">
            <img src={hotelName} alt="Florests Hotel" className="hotel-logo" />
            <div className="message-box">
                <div className="exclamation-icon">!</div>
                <p className="please-wait">Please Wait....</p>
                <p className="staff-message">Our staff will come to assist you shortly</p>
            </div>
             {/* Back button to return to CustomerDetailsPage */}
             <button onClick={handleBack} className="back-button">Back to Home</button>
        </div>
    );
};

export default CallStaff;
