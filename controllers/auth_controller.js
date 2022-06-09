const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Joi = require('joi');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

router.post("/register", jsonParser, asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const user = await db.User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists" })
        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = await db.User.create({ ...req.body, password: hashPassword })
        console.log(newUser)
        res.json(newUser);
        // res.status(201).send({ message: "User created" })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        // res.status(500).send({ message: "Internal server error" })
    }
}))

router.post('/login', jsonParser, asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const user = await db.User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send({ message: error.details[0].message })
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if (!validPassword)
            return res.status(400).send({ message: error.details[0].message })
        req.session.currentUser = {
            id: user._id,
            username: user.username,
            profilePic: user.profilePic,
        };
        const token = user.generateAuthToken();
        console.log(token)
        res.status(200).send({ data: token, message: "Logged in successfully" });

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}))

module.exports = router;