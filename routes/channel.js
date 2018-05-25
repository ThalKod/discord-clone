const   express     = require("express");
const   User        = require("../models/user");
const   middleware  = require("../middleware/index");
const   Channel     = require("../models/channel");
const   { ObjectID } = require("mongodb");

const       router = express.Router();
router.post("/new", middleware.isLogedIn, (req, res)=>{
    const channel = {
        creator: req.user._id,
    };

    User.findById(req.user._id).then((rUser)=>{
        Channel.create(channel).then((rChannel)=>{
            rUser.channels.push(rChannel._id);
            rUser.save();

            rChannel.participant.push(rUser._id);
            // rChannel.online
            rChannel.save();
            res.redirect(`/channel/${rChannel._id}`);
        }).catch((e)=>{
            console.log(e);
            res.redirect("back");
        });
    });
});


router.get("/join/:id", (req, res)=>{
    Channel.findById(ObjectID(req.params.id)).populate("participant").then((rChannel)=>{
        res.render("join", { channel: rChannel });
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
});

router.post("/join/:id", middleware.isLogedIn, (req, res)=>{
    Channel.findById(ObjectID(req.params.id)).then((rChannel)=>{
        if(!rChannel){
            res.redirect("/");
        }
        const numberUser = rChannel.participant.length;
        console.log(numberUser);
        for(let i = 0; i < numberUser; i++){
            if(rChannel.participant[i].equals(ObjectID(req.user._id))){
                return res.redirect(`/channel/${rChannel._id}`);
            }
        }
        rChannel.participant.push(req.user._id);
        rChannel.save();
        return res.redirect(`/channel/${rChannel._id}`);
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
});

router.get("/:id", middleware.isLogedIn, middleware.isChannelParticipant, (req, res)=>{
    Channel.findById(ObjectID(req.params.id)).populate("message").populate("participant").then((rChannel)=>{
        if(!rChannel){
            return res.redirect("/");
        }
        User.findById(req.user._id).populate("channels").then((rUser)=>{
            res.render("chat", { channel: rChannel, channels: rUser.channels });
        });
    })
    .catch((e)=>{
        res.redirect("/");
        console.log(e);
    });
});


module.exports = router;
