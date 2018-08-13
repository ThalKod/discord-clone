const { ObjectID } = require("mongodb");
const Channel = require("../models/channel");

const middleware = {};

middleware.isLogedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
};

middleware.isChannelParticipant = (req, res, next)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.redirect("/");
    }


    Channel.findById(ObjectID(req.params.id)).then((rChannel)=>{
        if(!rChannel){
            return res.redirect("/");
        }
        for(let i = 0; i < rChannel.participant.length; i++){
            if(rChannel.participant[i].equals(ObjectID(req.user._id))){
                return next();
            }
        }
        res.redirect("/channel/join/" + rChannel._id);
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
};

middleware.isChannelCreator = (req, res, next)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.redirect("/");
    }

    Channel.findById(ObjectID(req.params.id)).then((rChannel)=>{
        if(!rChannel){
            return res.redirect("/");
        }

        if(rChannel.creator.equals(ObjectID(req.user._id))){
            next();
        }else{
            return res.redirect("/");
        }
    });
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
