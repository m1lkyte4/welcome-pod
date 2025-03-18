import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

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

  return <div id="qr-reader" ref={scannerRef}></div>;
};

export default BarcodeScanner;
