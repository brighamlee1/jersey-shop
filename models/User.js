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
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpRvftRBgfCbvzOHB0bANVih3QvZD-xZ4flbABUFGDctmaY87ajkJD5RhdvVcyZvkS7U&usqp=CAU'
        },
        reviews: {
            type: mongoose.Types.ObjectId,
            ref: "Review",
        },
    }
)

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
//     return token;
// }

// const validate = (data) => {
//     const schema = Joi.object({
//         username: Joi.string().email().required().label("Username"),
//         email: Joi.string().email().required().label("Email"),
//         password: passwordComplexity().required().label("Password")
//     });
//     return schema.validate(data);
// }

const User = mongoose.model("User", userSchema);

module.exports = User;