var mongoose = require("mongoose");

channelSchema = mongoose.Schema({
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Channel", channelSchema);