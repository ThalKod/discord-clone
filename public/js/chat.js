/* eslint-disable */
const socket = io();
const chatList = $("#chat-list ul");
const username = $("#chat-list a");

socket.on("connect", function(){
    console.log("Connected");

    var params = {
        channelID,
        userID
    };

    socket.emit("join", params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log("No Error");
        }
    });
    
});

jQuery("#message-form").on("submit", function(e){
    e.preventDefault();

    var messageTextBox =  jQuery("[name=message]");
    
    var data = {
        userID,
        channelID : channelID,
        message: messageTextBox.val()
    };

    console.log(messageTextBox.val());

    socket.emit('createdMessage', data, function(){
        messageTextBox.val(" ");
    });
});

socket.on("newMessage", function(message){

    const formatedTime = moment().format("dddd [at] h:mm a");
    const tempRandomNum = Math.floor((Math.random() * 7) + 1);

    const div = jQuery("<div class='chat-message'></div>");
    div.html(`
            <div class="avatar"><img src="/img/placeholder-avatar${tempRandomNum}.jpg" /></div>
            <div class="chat-message-content">
                <a href="#" class="chat-message-author">${message.author.name}</a>
                <span class="chat-message-date">${formatedTime}</span>
                <div class="chat-message-message">
                        ${message.text} 
                </div>
            </div>
    `);

    jQuery("#mCSB_2_container").append(div);
    scrollToBottom();
});

socket.on("disconnect", function(){
    console.log("Disconnected to server");
});

// if User is looking at previous message we should not scroll down -- not yet implemented
function scrollToBottom(){
    // // Selectors
     var element = jQuery(".scroll-hijack");
    // var messagesContainer = jQuery("#mCSB_2_container");
    // var chatbody = jQuery("#mCSB_2");
    // var newMessage = messagesContainer.children().last();

    // // // Heights
    // var clientHeight = messagesContainer.prop("clientHeight");
    // var scrollTop = messagesContainer.prop("scrollTop");
    // var scrollHeight = messagesContainer.prop("scrollHeight");
    // var newMessageHeight = newMessage.innerHeight();
    // var lastMessageHeight = newMessage.prev().innerHeight();

    // console.log(clientHeight, scrollTop, scrollHeight, newMessageHeight, lastMessageHeight);

    // if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    //     console.log("scroll");
        element.mCustomScrollbar("scrollTo","bottom");
    // }


}

(function fetchOnlineUser(){
    console.log("Fetching online user...");
    $.get("/current/channel/"+ channelID )
        .done(function(data){
            chatList.html("");
            data.forEach(function(participant){ 
                const randomNumber = Math.floor((Math.random() * 7) + 1);
                const pUsername = participant.username;
                if(pUsername !== username["0"].text){
                    if(participant.online === true){
                        chatList.append(`<li><a href="#" class="user"><div class="avatar"><img src="/img/placeholder-avatar${randomNumber}.jpg" /></div>${pUsername}</a></li>`);
                    }else{
                         chatList.append(`<li><a href="#"><div class="avatar"><img src="/img/placeholder-avatar${randomNumber}.jpg" /></div>${pUsername}</a></li>`);
                    }
                }
            });
        });
    setTimeout(fetchOnlineUser,30000);
}())