const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config(); // load env vb from .env file

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'March@2025', // Replace with your MySQL password
    database: 'welcome_pod',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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

//API endpoint to get booking by booking number.
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