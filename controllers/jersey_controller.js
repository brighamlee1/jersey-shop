const express = require('express');
const router = express.Router();
const db = require('../models');
const { findById } = require("../models/Jersey");

router.get("/", async (req, res, next) => {
    try {
        const jerseys = await db.Jersey.find();
        res.status(200).json(jerseys);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;