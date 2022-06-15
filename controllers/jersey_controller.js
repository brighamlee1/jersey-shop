const express = require('express');
const router = express.Router();
const db = require('../models');

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

router.post("/:id/review", async (req, res, next) => {
    try {
        const jersey = await db.Jersey.findById(req.params.id);
        const user = await db.User.find({ username: req.body.username })
        console.log(user[0]);
        console.log(jersey)
        const createdReview = await db.Review.create({
            ...req.body,
            jersey: jersey,
            user: user[0],
        })
        res.status(200).json(createdReview)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.get("/:id/review", async (req, res, next) => {
    try {
        const reviews = await db.Review.find({ jersey: req.params.id }).populate("user");
        res.status(200).json(reviews);
    }
    catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// router.post("/:id/wishlist", async (req, res, next) => {
//     try {

//     } catch (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//     }
// })

router.get("/:id", async (req, res, next) => {
    try {
        const jersey = await db.Jersey.findById(req.params.id).populate("reviews")
        res.json(jersey);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;