const express     = require("express");
const multer = require("multer");
const mime = require("mime-types");
const path = require("path");
const crypto = require("crypto");
const middleware  = require("../middleware/index");
const Channel     = require("../models/channel");
const User = require("../models/user");

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../public/files/image"),
        filename: (req, file, cb)=>{
            crypto.pseudoRandomBytes(4, (err, raw)=>{
                const mimeType = mime.lookup(file.originalname);
                // throw away any extension if provided
                const nameSplit = file.originalname.split(".").slice(0, -1);
                // nameSplit.pop();

                // replace all white spaces with - for safe file name on different filesystem
                const name = nameSplit.join(".").replace(/\s/g, "-");
                cb(null, raw.toString("hex") + name + "." + mime.extension(mimeType));
            });
        },
    }),
});

// Get and return the current participant in a channel
router.get("/current/channel/:id", middleware.isLogedIn, middleware.isChannelParticipant, (req, res)=>{
    // console.log("get request");
    Channel.findById(req.params.id).populate("participant").then((rChannel)=>{
        const participantList = [];
        rChannel.participant.forEach((participant)=>{
            const aParticipant = {
                username: participant.username,
                online: participant.online,
                image: participant.profile_picture,
                id: participant._id,
            };
            participantList.push(aParticipant);
        });
        res.send(participantList);
    });
});

// Set the profile picture of a user
router.post("/profile/img", middleware.isLogedIn, upload.single("file"), (req, res)=>{
    if(req.file){
        const file = {
            path: "/files/image/" + req.file.filename,
        };
       User.findByIdAndUpdate(req.user._id, { profile_picture: "/files/image/" + req.file.filename }).then(()=>{
            res.send(file);
        });
    }else{
        res.json({ error: true });
    }
});


// Set the channel picture
// router.post("/channel/:id/img", middleware.isLogedIn, upload.single("file"), (req, res)=>{
//     console.log("hey");
//     if(req.file){
//         console.log(req.file);
//         const file = {
//             path: "/files/image/channel/" + req.file.filename,
//         };
//        Channel.findByIdAndUpdate(req.params.id, { channel_picture: file.path }).then(()=>{
//             res.send(file);
//        });
//     }else{
//         res.json({ error: true });
//     }
// });

module.exports = router;
