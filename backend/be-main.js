const generateQR = require('./generateQR');
app.use('/generate-qr', generateQR);

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));  // Serve static files

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr-code.png'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
