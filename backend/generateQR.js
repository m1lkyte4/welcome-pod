const QRCode = require('qrcode');
const fs = require('fs');

const generateQR = async (text) => {
    try {
        const qrPath = 'public/qr-code.png';  // Change the path as needed
        await QRCode.toFile(qrPath, text);
        console.log(`QR Code saved at ${qrPath}`);
    } catch (err) {
        console.error(err);
    }
};

// Example usage
generateQR('https://example.com');
