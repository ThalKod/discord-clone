const {
    saveMessage
} = require("../io/utils");


module.exports = (io) => {
    const chalk = require('chalk');
    const User = require("../models/user");

    io.on("connection", (socket) => {
        // Creates connection info for logs
        connection = [];
        connection.push(socket);
        console.log(chalk.greenBright(">> New User Connected | Total: ", connection.length));


        socket.on("join", (params, callback) => {
            socket.join(params.channelID);
            callback();
        });

        socket.on("createdMessage", (data, callback) => {
            saveMessage(io, data);
            callback();
            // console.log(data)
        });

        socket.on("disconnect", (socket) => {
            connection.push(socket);
            console.log(chalk.redBright(">> New User Diconected | Total: ", connection.length));
        });
    });
};
