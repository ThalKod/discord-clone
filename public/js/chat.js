var socket = io();

socket.on("connect", function(){
    console.log("Connected");


    jQuery("#message-form").on("submit", function(e){
        e.preventDefault();

        var messageTextBox =  jQuery("[name=message]");
        
        var data = {
            userID,
            channelID : channelID,
            message: messageTextBox.val()
        };

        socket.emit('createdMessage', data, function(){
            messageTextBox.val(" ");
        });
    });
});

socket.on("newMessage", function(message){

    var li = jQuery("<li></li>");
    li.html("<b>"+ message.author.name+"</b> : <i>"+message.text+"</i>");

    jQuery("#messages").append(li);
});

socket.on("disconnect", function(){
    console.log("Disconnected to server");
});