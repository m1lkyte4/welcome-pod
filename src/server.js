const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Update CORS to allow requests from your Netlify app
// Remove trailing slash from origin URL
const corsOptions = {
    origin: 'https://welcom3p0d.netlify.app', // Removed trailing slash
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Function to parse JAWSDB_URL if present
function getDbConfig() {
    if (process.env.JAWSDB_URL) {
        try {
            // Parse connection string like mysql://username:password@hostname:port/database
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
            // Fall back to environment variables
        }
    }
    
    // Default config using environment variables
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

// Create pool with the appropriate config
const pool = mysql.createPool(getDbConfig());

// Test database connection
pool.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully');
    }
});

// API endpoint to add a booking
app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    console.log('Adding booking:', booking);
    
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
    console.log('Looking up booking number:', bookingNumber);
    
    pool.query('SELECT * FROM bookings WHERE bookingNumber = ?', [bookingNumber], (err, results) => {
        if (err) {
            console.error('Error getting booking:', err);
            res.status(500).json({ error: 'Error getting booking', details: err.message });
        } else if (results.length === 0) {
            console.log('No booking found with number:', bookingNumber);
            res.status(404).json({ error: 'Booking not found' });
        } else {
            console.log('Found booking:', results[0]);
            res.json(results[0]);
        }
    });
});

// Add a test endpoint to verify database connection
app.get('/api/test-db', (req, res) => {
    pool.query('SELECT 1 as connection_test', (err, results) => {
        if (err) {
            console.error('Database test failed:', err);
            res.status(500).json({ 
                success: false, 
                error: 'Database connection failed', 
                details: err.message,
                config: {
                    host: getDbConfig().host,
                    user: getDbConfig().user,
                    database: getDbConfig().database
                    // Don't send password in response
                }
            });
        } else {
            res.json({ 
                success: true, 
                message: 'Database connected successfully',
                result: results[0],
                config: {
                    host: getDbConfig().host,
                    user: getDbConfig().user,
                    database: getDbConfig().database
                    // Don't send password in response
                }
            });
        }
    });
});

// Add a simple route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Welcome Pod API!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});