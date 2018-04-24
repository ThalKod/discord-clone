var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport"),
    middleware  = require("../middleware/index");

var router = express.Router();

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate('local-login', {failureRedirect : '/users/register'}), (req, res) =>{
   res.redirect("/users/@me");
});
 
router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register",passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/users/register', // redirect back to the signup page if there is an error
}), (req, res) =>{
    console.log("User Registered");
});

router.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("/");
});


//Users Profile
router.get("/@me",middleware.isLogedIn, (req, res)=>{
    User.findById(req.user._id).then((rUser)=>{
        res.send(rUser);
    }).catch((e)=>{
        res.send(e);
    });
});


module.exports = router;