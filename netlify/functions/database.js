const mysql = require('mysql2/promise');
require('dotenv').config();

// Function to parse JAWSDB_URL
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

exports.handler = async (event, context) => {
  let connection;
  let config;
  
  try {
    // Use JAWSDB_URL if available
    if (process.env.JAWSDB_URL) {
      config = parseDbUrl(process.env.JAWSDB_URL);
    } else {
      // Fallback to individual environment variables
      config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'March@2025',
        database: process.env.DB_NAME || 'welcome_pod',
        port: process.env.DB_PORT || 3306
      };
    }
    
    connection = await mysql.createConnection(config);
    const [rows] = await connection.query('SELECT * FROM Bookings');
    await connection.end();
    
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error('Database connection error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to the database', details: err.message }),
    };
  }
};