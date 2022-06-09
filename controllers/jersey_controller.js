const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", async (req, res, next) => {
    try {
        const jerseys = await db.Jersey.find().populate(db.User);
        res.status(200).json(jerseys);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const jersey = await db.Jersey.findById(req.params.id);
        const reviews = await db.Review.find();
        res.status(200).json(jersey);
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// router.get("/:id/reviews", async (req, res, next) => {
//     try {
//         // Need to add .populate('user') below
//         const reviews = await db.Review.find();
//         res.status(200).json(reviews);
//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// })

router.post("/:id/reviews", async (req, res, next) => {
    try {
        await db.Review.create({
            user
        })
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;