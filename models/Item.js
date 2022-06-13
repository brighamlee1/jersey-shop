const mongoose = require('mongoose');

itemSchema = new mongoose.Schema(
    {
        wishlist: {
            type: mongoose.Types.ObjectId,
            ref: "Wishlist",
        },
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
            required: true,
            default: 'S'
        }
    }
)

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;