const User     = require("../models/user"),
      { ObjectID } = require("mongodb"),
      Message   = require("../models/message"),
      Channel   = require("../models/channel"),
      utils     = {};

utils.saveMessage = function saveMessage(io, data){
    User.findById(ObjectID(data.userID)).then((rUser)=>{
        const msg = {
            text: data.message,
            author: {
                id: rUser._id,
                name: rUser.username,
            },
        };
        Message.create(msg).then((rMsg)=>{
            console.log(rMsg);
            Channel.findByIdAndUpdate(ObjectID(data.channelID)).then((rChannel)=>{
                rChannel.message.push(rMsg);
                rChannel.save();
                io.to(data.channelID).emit("newMessage", msg);
                console.log(rChannel);
            }).catch((e)=>{
                console.log(e);
            });
        }).catch((e)=>{
            console.log(e);
        });
    }).catch((e)=>{
        console.log(e);
    });
};

module.exports = utils;
