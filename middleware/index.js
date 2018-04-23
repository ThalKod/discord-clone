const User = require("../models/user");

var middleware = {};

middleware.isLogedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
};

// middleware.isItUserProfile = (req, res, next)=>{
//     User.findById(req.params.id).then((rUser)=>{
//         if(!rUser){
//             res.redirect("/");
//             console.log("NO user with this ID");
//         }else{
//             console.log(rUser._id, req.user._id);
//             if(rUser._id.equals(req.user._id)){
//                 next();
//             }else{
//                 res.redirect("/");
//                 console.log("not the user profile");
//             }
//         }
//     })
// };

module.exports = middleware;