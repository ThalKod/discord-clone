var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    middleware  = require("../middleware/index"),
    Message     = require("../models/message"),
    Channel     = require("../models/channel"),
    {ObjectID} = require("mongodb");




var router = express.Router();

router.post("/new",middleware.isLogedIn, (req, res)=>{
    var channel = {
        creator: req.user._id
    };

    User.findById(req.user._id).then((rUser)=>{
        Channel.create(channel).then((rChannel)=>{
            
            rUser.channels.push(rChannel._id);
            rUser.save();

            rChannel.participant.push(rUser._id);
            rChannel.save();
    
            res.redirect("/channel/"+rChannel._id);
        }).catch((e)=>{
            console.log(e);
            res.redirect("back");
        })
    });
    
});


router.get("/join/:id", (req, res)=>{
    console.log(req.params.id);
    Channel.findById(ObjectID(req.params.id)).then((rChannel)=>{
        var ChannelUserCount = rChannel.participant.length;
        res.render("join", {ChannelUserCount, channelID: rChannel._id});
    }).catch((e)=>{
        res.redirect("/");
    });
});

router.get("/:id",middleware.isLogedIn, middleware.isChannelParticipant, (req, res)=>{
    Channel.findById(ObjectID(req.params.id)).populate("message").then((rChannel)=>{
        if(!rChannel){
            return res.redirect("/");
        }
        res.render("chat", {channel: rChannel});
    }).catch((e)=>{
        res.redirect("/");
        console.log(e);
    });
});


module.exports = router;