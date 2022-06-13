const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

router.post("/register", jsonParser, asyncHandler(async (req, res, next) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists" })
        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = await db.User.create({ ...req.body, password: hashPassword })
        console.log(newUser)
        res.json(newUser);
        console.log(req.session);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}))

router.post('/login', jsonParser, asyncHandler(async (req, res, next) => {
    try {
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
            profile: user.profile,
        };
        req.session.save();
        console.log(req.session)
        res.send(req.session.currentUser)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        return next();
    }
}))

router.get('/logout', jsonParser, (req, res) => {
    try {
        console.log(req.session)
        req.session.destroy();
        res.clearCookie('connect.sid')
        res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

// router.post('/logout', (req, res) => {
//     try {
//         req.session.destroy()
//         res.clearCookie('connect.sid') // clean up!
//         return res.json({ msg: 'logging you out' })
//     } catch {
//         return res.json({ msg: 'no user to log out!' })
//     }
// })

module.exports = router;