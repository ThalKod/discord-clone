const express     = require("express");
const multer = require("multer");
const mime = require("mime-types");
const path = require("path");
const middleware  = require("../middleware/index");
const Channel     = require("../models/channel");

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../files/image/profile"),
        filename: (req, file, cb)=>{
            crypto.pseudoRandomBytes(4, (err, raw)=>{
                const mime_type = mime.lookup(file.originalname);

                // throw away any extension if provided
                const nameSplit = file.originalname.split(".").slice(0, -1);
                // nameSplit.pop();

                // replace all white spaces with - for safe file name on different filesystem
                const name = nameSplit.join(".").replace(/\s/g, "-");
                cb(null, raw.toString("hex") + name + "." + mime.extension(mime_type));
            });
        }
    })
});


router.get("/current/channel/:id", middleware.isLogedIn, middleware.isChannelParticipant, (req, res)=>{
    // console.log("get request");
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

router.post("/profile/img", (req, res)=>{
    console.log("called");
});

module.exports = router;
