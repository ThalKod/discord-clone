const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        name: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messageSchema);
