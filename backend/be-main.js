/*const generateQR = require('./generateQR');
app.use('/generate-qr', generateQR);

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));  // Serve static files

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr-code.png'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); */

// backend/be-main.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// JawsDB database configuration
const db = mysql.createConnection({
    host: process.env.JAWSDB_URL ? new URL(process.env.JAWSDB_URL).hostname : 'lg7j30weuqckmw07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: process.env.JAWSDB_URL ? new URL(process.env.JAWSDB_URL).username : 'apd44c79cu0ax9wq',
    password: process.env.JAWSDB_URL ? new URL(process.env.JAWSDB_URL).password : 'qxy6ibye1u0rgjik',
    database: process.env.JAWSDB_URL ? new URL(process.env.JAWSDB_URL).pathname.substring(1) : 'j54t94851or90hzr'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

app.get('/bookings/:bookingNumber', (req, res) => {
    const bookingNumber = req.params.bookingNumber;
    const sql = 'SELECT * FROM bookings WHERE bookingNumber = ?';

    db.query(sql, [bookingNumber], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Database error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Booking not found');
            return;
        }

        res.json(results[0]);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr-code.png'));
});

//app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
});

