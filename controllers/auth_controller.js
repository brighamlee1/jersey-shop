const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = require("../models/User");

router.post("/register", async (req, res) => {
    console.log(req.body);
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate Email' })
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    
    if (user) {
        return res.json({ status: 'ok', user: true })
    } else {
        return res.json({ status: 'error', user: false })
    }
})