const config = {};

config.port = process.env.PORT || 5000;
config.dbURL = process.env.DATABASEURL || "mongodb+srv://admin:admin@cluster0-5dalc.mongodb.net/MiniCord?retryWrites=true&w=majority";
config.URL = process.env.URL || "http://localhost:5000";

module.exports = config;
