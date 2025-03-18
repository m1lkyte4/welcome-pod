const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const QRCode = require('qrcode');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Update CORS to allow requests from your Netlify app
const corsOptions = {
    origin: 'https://welcom3p0d.netlify.app', // Ensure no trailing slash
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Function to parse JAWSDB_URL if present
function getDbConfig() {
    if (process.env.JAWSDB_URL) {
        try {
            const matches = process.env.JAWSDB_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
            return {
                host: matches[3],
                user: matches[1],
                password: matches[2],
                database: matches[5],
                port: matches[4],
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            };
        } catch (error) {
            console.error("Error parsing JAWSDB_URL:", error);
        }
    }
    
    return {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'March@2025',
        database: process.env.DB_DATABASE || 'welcome_pod',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };
}

// Create database connection pool
const pool = mysql.createPool(getDbConfig());

// Test database connection
pool.query('SELECT 1', (err) => {
    if (err) console.error('Database connection failed:', err);
    else console.log('Database connected successfully');
});

// API endpoint to add a booking
app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    
    pool.query('INSERT INTO bookings SET ?', booking, (err, results) => {
        if (err) {
            console.error('Error adding booking:', err);
            res.status(500).json({ error: 'Error adding booking', details: err.message });
        } else {
            res.json({ success: true, message: 'Booking added successfully' });
        }
    });
});

// API endpoint to get booking by booking number
app.get('/api/bookings/:bookingNumber', (req, res) => {
    const bookingNumber = req.params.bookingNumber;
    
    pool.query('SELECT * FROM bookings WHERE bookingNumber = ?', [bookingNumber], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error getting booking', details: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// ✅ API to generate QR code for a booking
app.get('/api/generate-qr/:bookingNumber', (req, res) => {
    const bookingNumber = req.params.bookingNumber;

    pool.query('SELECT * FROM bookings WHERE bookingNumber = ?', [bookingNumber], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const booking = results[0];
        const qrData = JSON.stringify(booking); // Convert to JSON string

        // Generate QR Code
        QRCode.toDataURL(qrData, (err, url) => {
            if (err) {
                return res.status(500).json({ error: 'QR Code generation failed', details: err.message });
            }
            
            res.send(`
                <h1>QR Code for Booking ${bookingNumber}</h1>
                <img src="${url}" />
                <p>Scan this QR code to retrieve booking details</p>
            `);
        });
    });
});

// Test database connection API
app.get('/api/test-db', (req, res) => {
    pool.query('SELECT 1 as connection_test', (err, results) => {
        if (err) {
            res.status(500).json({ 
                success: false, 
                error: 'Database connection failed', 
                details: err.message
            });
        } else {
            res.json({ 
                success: true, 
                message: 'Database connected successfully',
                result: results[0]
            });
        }
    });
});

// Root API route
app.get('/', (req, res) => {
    res.send('Welcome to the Welcome Pod API!');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
});
