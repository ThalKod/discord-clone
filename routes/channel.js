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
    Channel.create(channel).then((rChannel)=>{
        res.redirect("/channel/"+rChannel._id);
    }).catch((e)=>{
        console.log(e);
        res.redirect("back");
    })
});

router.get("/:id",middleware.isLogedIn, (req, res)=>{
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