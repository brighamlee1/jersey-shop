const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "ex. abc123@gmail.com"],
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please create a password"],
        },
        profile: {
            type: String,
            default: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            }
        ],
        wishlist: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Wishlist',
            }
        ]
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;