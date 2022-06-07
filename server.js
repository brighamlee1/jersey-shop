const express = require('express');
const cors = require('cors');
const controllers = require('./controllers')

// Import JSON files
const jerseys = require('./jerseys.json')

// Create app object
const app = express();

require("./config/db.connection");

// Middleware
app.use(cors());
app.use("/", controllers.jersey);
app.use("/auth", controllers.auth)
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/jerseys', async (req, res) => {
    res.json(jerseys);
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
