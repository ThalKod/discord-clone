const mongoose = require("mongoose"),
      User     = require("../models/user"),
      {ObjectID} = require("mongodb"),
      Message   = require("../models/message");


module.exports = (io)=>{
        io.on("connection", (socket)=>{
        console.log("New User Connected");

        socket.on("createdMessage", (data, callback) =>{
            console.log(data);
            User.findById(ObjectID(data.userID)).then((rUser)=>{
                console.log(rUser);
                var msg = {
                    text: data.message,
                    author:{
                        id: rUser._id,
                        name: rUser.username
                    }
                };
                Message.create(msg).then((rMsg)=>{ 
                    console.log(rMsg);
                }).catch((e)=>{
                    console.log(e);
                });

            }).catch((e)=>{
                console.log(e);
            });
            
            io.emit("newMessage", data.message);
            callback();
        });

    
        socket.on("disconnect", ()=>{
            console.log("Diconected");
        })
    });
}