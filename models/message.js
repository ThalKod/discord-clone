const mongoose = require("mongoose");
const moment   = require("moment");

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
        type: String,
        default: moment().format("dddd [at] h:mm a"),
    },
});

module.exports = mongoose.model("Message", messageSchema);
