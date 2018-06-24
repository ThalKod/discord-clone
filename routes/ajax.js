const   express     = require("express");
// const   { ObjectID } = require("mongodb");
// const   User        = require("../models/user");
const   middleware  = require("../middleware/index");
const   Channel     = require("../models/channel");

const   router = express.Router();


router.get("/current/channel/:id", middleware.isLogedIn, middleware.isChannelParticipant, (req, res)=>{
    console.log("get request");
    Channel.findById(req.params.id).populate("participant").then((rChannel)=>{
        const participantList = [];
        rChannel.participant.forEach((participant)=>{
            const aParticipant = {
                username: participant.username,
                online: participant.online,
            };
            participantList.push(aParticipant);
        });
        res.send(participantList);
    });
});

module.exports = router;
