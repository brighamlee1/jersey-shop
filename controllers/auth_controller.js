const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let jwt = require("jsonwebtoken");
const { User } = require('../models');
const { token } = require('morgan');

router.post("/register", jsonParser, asyncHandler(async (req, res, next) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists" })
        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = await db.User.create({ ...req.body, password: hashPassword })
        console.log(newUser)
        res.json({ newUser, status: 'ok' });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}))

let refreshTokens = [];

// router.post('/refresh', (req, res) => {
//     const refreshToken = req.body.token;

//     if (!refreshToken) return res.status(401).json("You are not authenticated!");
//     if (!refreshTokens.includes(refreshToken)) {
//         return res.status(403).json("Refresh token is valid!")
//     }
//     jwt.verify(refreshToken, "secretrefreshkey", (err, user) => {
//         err && console.log(err);
//         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//         const newAccessToken = createAccessToken(user);
//         const newRefreshToken = createRefreshToken(user);

//         refreshTokens.push(newRefreshToken);

//         res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//         })
//     })
// })

const createAccessToken = (user) => {
    return jwt.sign(
        { email: user.email }, "secretaccesskey", { expiresIn: '1d' }
    )
}

const createRefreshToken = (user) => {
    return jwt.sign(
        { email: user.email }, "secretrefreshkey", { expiresIn: '1d' }
    )
}

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
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        refreshTokens.push(refreshToken);

        res.json({
            profile: user.profile,
            username: user.username,
            id: user._id,
            accessToken,
            refreshToken,
            user: accessToken,
            status: 'ok',
        })

    } catch (error) {
        console.log(error)
        res.json({ status: "error", user: false })
        return next();
    }
}))

router.get("/status", async (req, res) => {
    const token = req.headers["x-acess-token"];

    try {
        const decoded = jwt.verify(token, "secretaccesskey");
        const email = decoded.email;
        const user = await db.User.findOne({ email: email }).populate("reviews");
        return res.json({
            status: "ok",
            username: user.username,
            email: user.email,
            profile: user.profile,
            reviews: user.reviews,
        });
    } catch (error) {
        console.log(error);
        // res.json({ status: "error", error: "invalid token" });
    }
});

// const verify = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.splt(" ")[1];

//         jwt.verify(token, "secretaccesskey", (err, user) => {
//             if (err) {
//                 return res.status(403).json("Token is not valid!")
//             }
//             req.user = user;
//         })
//     }
//     else {
//         res.status(401).json("You are not authenticated!")
//     }
// }

router.post('/logout', (req, res) => {
    try {
        const refreshToken = req.body.token;
        refreshTokens = filter((token) => token !== refreshToken)
        res.status(200).json("You logged out successfully")
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