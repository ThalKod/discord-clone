const express     = require("express");
const User        = require("../models/user");

const router      = express.Router();

router.get("/", (req, res)=>{
    if(req.user){
        User.findById(req.user._id).then(()=>res.redirect("/users/@me"))
        .catch((e)=>{
            console.log(e);
            return res.redirect("/users/login");
        });
    }else{
        res.redirect("/users/login");
    }
});


module.exports = router;
