const { Client } = require('pg'); // For PostgreSQL; replace with your DB client
exports.handler = async (event, context) => {
  const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'welcome_pod',
    password: 'March@2025',
    port: 3000, // Change if using a different DB
  });

  try {
    await client.connect();
    const res = await client.query('SELECT * FROM Bookings'); // Example query
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to the database' }),
    };
  }
};
