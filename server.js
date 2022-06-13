const express = require('express');
const cors = require('cors');
const controllers = require('./controllers')
const session = require('express-session');
const MongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser')
const navLinks = require('./navLinks');
let bodyParser = require('body-parser')

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
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// console.log('hitting session create'),
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
        secret: "secretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // one day
        },
    })
);

let sessionLog = async (req, res, next) => {
    console.log(req.session);
    next();
};

app.use(sessionLog);

app.use("/jerseys", controllers.jersey);
app.use("/auth", controllers.auth)
app.use(navLinks);

app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    console.log(req.session)
    next();
});

app.get('/', (req, res) => {
    res.redirect("auth/login")
})