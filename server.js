const express = require('express');
const cors = require('cors');
const controllers = require('./controllers')
const session = require('express-session');


// Import JSON files
const jerseys = require('./jerseys.json')
let bodyParser = require('body-parser')

// Create app object
const app = express();

require("./config/db.connection");

// Middleware
app.use(cors());
app.use("/jerseys", controllers.jersey);
app.use("/auth", controllers.auth)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/jerseys', async (req, res) => {
    res.json(jerseys);
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
