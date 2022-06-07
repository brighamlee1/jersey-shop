const mongoose = require('mongoose');

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
        }
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;