var socket = io();

socket.on("connect", function(){
    console.log("Connected");


    jQuery("#message-form").on("submit", function(e){
        e.preventDefault();

        var messageTextBox =  jQuery("[name=message]");
        
        var data = {
            userID,
            channelID : "23",
            message: messageTextBox.val()
        };

        socket.emit('createdMessage', data, function(){
            messageTextBox.val(" ");
        });
    });
});

socket.on("newMessage", function(message){

    var li = jQuery("<li></li>");
    li.text(message);

    jQuery("#messages").append(li);
});

socket.on("disconnect", function(){
    console.log("Disconnected to server");
});