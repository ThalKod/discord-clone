const config = {};

config.port = process.env.PORT || 5000;
config.dbURL = process.env.DATABASEURL || "mongodb+srv://";
config.URL = process.env.URL || "http://localhost:5000";

module.exports = config;
