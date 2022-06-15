const mongoose = require('mongoose');

wishlistSchema = new mongoose.Schema(
    {
        items: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Item",
            }
        ],
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    }
)

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;