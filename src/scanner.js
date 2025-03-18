import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './scanner.css';

const BarcodeScanner = () => {
  const scannerRef = useRef(null);

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
      },
      (errorMessage) => {
        console.error(`Error scanning: ${errorMessage}`);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  //return <div id="qr-reader" ref={scannerRef}></div>;
  return (
    <div className="scanner"> 
      <div id="qr-reader"></div>
      {/* Add your "Stop Scanning" button here, if it exists */}
      {/* Ensure the button has the class "check-in-button" if you want to style it */}
      <button className="check-in-button" onClick={() => scannerRef.current.clear()}>Stop Scanning</button>
    </div>
  );
};

export default BarcodeScanner;
