var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    middleware  = require("../middleware/index");



var router = express.Router();
 
router.get("/:id",middleware.isLogedIn, (req, res)=>{
    User.findById(req.user._id).then((rUser)=>{
        res.render("chat", {userID: rUser._id});
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
    
});


module.exports = router;