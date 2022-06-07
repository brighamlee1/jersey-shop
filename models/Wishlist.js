const mongoose = require('mongoose');

wishlistSchema = new mongoose.Schema(
    {
        jerseys: {
            type: mongoose.Types.ObjectId,
            ref: "Jersey",
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    }
)