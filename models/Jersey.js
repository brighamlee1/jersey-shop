const mongoose = require('mongoose');

const jerseySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        team: {
            type: String, 
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        reviews: {
            type: mongoose.Types.ObjectId,
            ref: "Review",
        }
    }
)

const Jersey = mongoose.model("Jersey", jerseySchema);

module.exports = Jersey;