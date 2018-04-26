var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    middleware  = require("../middleware/index");



var router = express.Router();
 
router.get("/:id",middleware.isLogedIn, (req, res)=>{
    
    res.render("chat");
    
});


module.exports = router;