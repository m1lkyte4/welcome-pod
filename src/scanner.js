import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './scanner.css';
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = () => {
  //const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader", 
      { fps: 40, qrbox: { width: 450, height: 450 } }
    );

    scanner.render(
      (decodedText, decodedResult) => {
        alert(`Scanned result: ${decodedText}`);
        console.log(decodedResult);
        scanner.clear(); // Stop scanning after success
        navigate('/customer-details/100001'); // redirect to customer details
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
  }, []);

  return (
    <div className="scanner"> 
      <div id="qr-reader"></div>
      {/* Add your "Stop Scanning" button here, if it exists */}
      {/* Ensure the button has the class "check-in-button" if you want to style it */}
      <button className="back-button" onClick={() => navigate('/check-in-method')}>Back</button>
      {/*<button className="check-in-button" onClick={() => scannerRef.current.clear()}>Stop Scanning</button>*/}
    </div>
  );
};

export default BarcodeScanner;
