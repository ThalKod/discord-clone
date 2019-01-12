const mongoose = require("mongoose");

const friendsRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    status: {
        type: Number, // 1-> request send to recipeint, 2-> request accepted by recipient 3-> request reject by recipient...
        require: true,
    },
});

module.exports = mongoose.model("friendsRequest", friendsRequestSchema);
