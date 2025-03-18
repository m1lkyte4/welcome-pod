import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./scanner.css";

const BarcodeScanner = () => {
  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 500, height: 500 },
    });

    scanner.render(
      (decodedText) => {
        alert(`Scanned result: ${decodedText}`);
        scanner.clear(); // Stop scanning after success
        navigate("/cdp2"); // Navigate after scanning
      },
      (errorMessage) => {
        console.error(`Error scanning: ${errorMessage}`);
      }
    );

    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      scanner.clear();
      navigate("/cdp2"); // Navigate after timeout
    }, 5000);

    return () => {
      clearTimeout(timer);
      scanner.clear();
    };
  }, [navigate]);

  return (
    <div className="scanner">
      <div id="qr-reader"></div>
      <button className="back-button" onClick={() => navigate("/check-in-method")}>Back</button>
    </div>
  );
};

export default BarcodeScanner;
