const mysql = require('mysql2/promise');
require('dotenv').config();

function parseDbUrl(url) {
  const pattern = /^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/;
  const matches = url.match(pattern);
  
  if (matches) {
    return {
      user: matches[1],
      password: matches[2],
      host: matches[3],
      port: matches[4],
      database: matches[5]
    };
  }
  
  return null;
}

// Use a connection pool for efficiency
const config = process.env.JAWSDB_URL
  ? parseDbUrl(process.env.JAWSDB_URL)
  : {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'March@2025',
      database: process.env.DB_NAME || 'welcome_pod',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

const pool = mysql.createPool(config);


exports.handler = async (event, context) => {
  let connection;
  let config;
  
  try {
    // Extract booking ID from path
    // This handles different ways Netlify might pass the path
    let bookingId;
    if (event.pathParameters) {
      bookingId = event.pathParameters.id;
    } else if (event.path) {
      bookingId = event.path.split('/').pop();
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No booking ID provided' }),
      };
    }

    // Query database
    const [rows] = await pool.query('SELECT * FROM bookings WHERE bookingNumber = ?', [bookingId]);
    
    // Use JAWSDB_URL if available
    if (process.env.JAWSDB_URL) {
      config = parseDbUrl(process.env.JAWSDB_URL);
    } else {
      config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'March@2025',
        database: process.env.DB_NAME || 'welcome_pod',
        port: process.env.DB_PORT || 3306
      };
    }
    
    connection = await mysql.createConnection(config);
    const [rows] = await connection.query('SELECT * FROM bookings WHERE bookingNumber = ?', [bookingId]);
    await connection.end();
    
    // Check if booking was found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Booking not found' }),
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(rows[0]), // Return the first matching booking
    };
  } catch (err) {
    console.error('Database connection error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to the database', details: err.message }),
    };
  }
};