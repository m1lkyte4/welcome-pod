import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import './scanner.css';

const BarcodeScanner = () => {
  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } }
    );

    scanner.render(
      (decodedText, decodedResult) => {
        alert(`Scanned result: ${decodedText}`);
        console.log(decodedResult);
        scanner.clear(); // Stop scanning after success
        navigate('/customer-details/100001'); // Redirect to customer details
      },
      (errorMessage) => {
        console.error(`Error scanning: ${errorMessage}`);
      }
    );

    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      scanner.clear();
      navigate('/customer-details/100001'); // Redirect to customer details page
    }, 5000);

    return () => {
      clearTimeout(timer);
      scanner.clear();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //  Removed `navigate` from dependency array to avoid warnings

  return (
    <div className="scanner"> 
      <div id="qr-reader"></div>
      <button className="back-button" onClick={() => navigate('/check-in-method')}>Back</button>
    </div>
  );
};

export default BarcodeScanner;
