var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    middleware  = require("../middleware/index"),
    Message     = require("../models/message"),
    Channel     = require("../models/channel"),
    {ObjectID} = require("mongodb");




var router = express.Router();
 
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