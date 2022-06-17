const mongoose = require('mongoose');

itemSchema = new mongoose.Schema(
    {
        jersey: {
            type: mongoose.Types.ObjectId,
            ref: "Jersey"
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        size: {
            type: String,
            required: true
        },
        wishlist: {
            type: mongoose.Types.ObjectId,
            ref: "Wishlist"
        }
    }
)

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;