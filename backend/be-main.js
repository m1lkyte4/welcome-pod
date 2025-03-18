const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use Heroku's provided port

app.get('/', (req, res) => {
    res.send('Hello from the new backend file!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
