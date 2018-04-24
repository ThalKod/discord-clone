var mongoose = require("mongoose");

var messageSchema = mongoose.Schema({
    text:{
        type: string
    },
    authors:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: string
    }
});

module.exports = mongoose.model("message", messageSchema);