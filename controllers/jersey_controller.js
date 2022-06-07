const express = require('express');
const router = express.Router();
const db = require('../models');
const { Jersey } = require("../models/Jersey");

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

router.get("/:id", async (req, res, next) => {
    try {
        const jersey = await db.Jersey.findById();
        res.status(200).json(jersey);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;