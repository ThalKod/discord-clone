var mongoose = require("mongoose");

channelSchema = new mongoose.Schema({
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    participant:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    date:{
        type: Date,
        default: Date.now()
    } 
});

module.exports = mongoose.model("Channel", channelSchema);