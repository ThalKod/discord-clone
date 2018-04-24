module.exports = (io)=>{
        io.on("connection", (socket)=>{
        console.log("New User Connected");

        socket.on("createdMessage", (data, callback) =>{
            console.log(data);
            
            io.emit("newMessage", data.message);
            callback();
        });

    
        socket.on("disconnect", ()=>{
            console.log("Diconected");
        })
    });
}