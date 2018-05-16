const mongoose = require("mongoose"),
      {saveMessage} = require("../io/utils");
    //   User     = require("../models/user"),
    //   {ObjectID} = require("mongodb"),
    //   Message   = require("../models/message"),
    //   Channel   = require("../models/channel");


module.exports = (io)=>{
        io.on("connection", (socket)=>{
        console.log("New User Connected");


        socket.on("join", (params, callback)=>{
            socket.join(params.channelID);
            
            callback();
        });

        socket.on("createdMessage", (data, callback) =>{
            saveMessage(io,data);
            //io.emit("newMessage", data.message);
            callback();
        });

    
        socket.on("disconnect", ()=>{
            console.log("Diconected");
        });
    });
}