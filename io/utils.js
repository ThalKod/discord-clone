const { ObjectID } = require("mongodb");
const User     = require("../models/user");
const Message   = require("../models/message");
const Channel   = require("../models/channel");

const utils     = {};

utils.saveMessage = function saveMessage(io, data){
    User.findById(ObjectID(data.userID)).then((rUser)=>{
        const msg = {
            text: data.message,
            author: rUser,
        };
        Message.create(msg).then((rMsg)=>{
            Channel.findByIdAndUpdate(ObjectID(data.channelID)).then((rChannel)=>{
                rChannel.message.push(rMsg);
                rChannel.save();
                // io.to(data.channelID).emit("newMessage", msg);
                io.to(data.channelID).emit("newMessage", rMsg);
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
