const express = require('express');
const cors = require('cors');

// Create app object
const app = express();

// Middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
