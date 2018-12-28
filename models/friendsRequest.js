const mongoose = require("mongoose");

const friendsRequestSchema = new mongoose.Schema({
    requester: {
        type: Number,
        require: true,
    },
    recipient: {
        type: Number,
        require: true,
    },
    status: {
        type: Number, // 1-> request send to recipeint, 2-> request accepted by recipient 3-> request reject by recipient...
        require: true,
    },
});

module.exports = mongoose.model("friendsRequest", friendsRequestSchema);
