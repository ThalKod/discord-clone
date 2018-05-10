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
    created_at:{
        type: Date,
        default: Date.now()
    },
    online_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ] 
});

module.exports = mongoose.model("Channel", channelSchema);