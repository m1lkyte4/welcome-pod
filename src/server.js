const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use Heroku's PORT or 3000 locally

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'March@2025',
    database: process.env.DB_DATABASE || 'welcome_pod',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// API endpoint to add a booking
app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    pool.query('INSERT INTO bookings SET ?', booking, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding booking');
        } else {
            res.send('Booking added successfully');
        }
    });
});

// API endpoint to get booking by booking number.
app.get('/api/bookings/:bookingNumber', (req, res) => {
    const bookingNumber = req.params.bookingNumber;
    pool.query('SELECT * FROM bookings WHERE bookingNumber = ?', bookingNumber, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error getting booking');
        } else if (results.length === 0) {
            res.status(404).send('Booking not found');
        } else {
            res.json(results[0]);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});