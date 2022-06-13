const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        jersey: {
            type: mongoose.Types.ObjectId,
            ref: "Jersey",
        },
        stars: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        text: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;