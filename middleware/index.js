const User = require("../models/user"),
      Channel = require("../models/channel"),
      {ObjectID} = require("mongodb");


var middleware = {};

middleware.isLogedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
};

middleware.isChannelParticipant = (req, res, next)=>{
    Channel.findById(ObjectID(req.params.id)).then((rChannel)=>{
        for(var i =0; i < rChannel.participant.length; i++){
            //TODO: Checking if current USer ID is in participant list
        }
        next();
        //res.redirect("/");
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
}

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