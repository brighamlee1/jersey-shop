const express = require('express');
const cors = require('cors');

// Import JSON files
const jerseys = require('./jerseys.json')

// Create app object
const app = express();

require("./config/db.connection");

// Middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/jerseys', async (req, res) => {
    res.json(jerseys);
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
