const express = require('express');
const cors = require('cors');
const controllers = require('./controllers')
const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser')
const morgan = require("morgan");

// Create app object
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

require("./config/db.connection");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use("/jerseys", controllers.jersey);
app.use("/auth", controllers.auth);

app.get('/', (req, res) => {
    res.redirect("auth/login")
})