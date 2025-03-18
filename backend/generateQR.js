const QRCode = require("qrcode");

async function generateQR(data) {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data);
    return qrCodeDataURL;
  } catch (err) {
    console.error("Error generating QR Code:", err);
    throw err;
  }
}

module.exports = generateQR;
