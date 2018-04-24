var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport");


var router = express.Router();
 
router.get("/", (req, res)=>{
    res.render("index");
});


module.exports = router;