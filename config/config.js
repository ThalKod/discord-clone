const config = {};

config.port = process.env.PORT || 5000;
config.dbURL = process.env.DATABASEURL || "mongodb://localhost/minicord";
config.domain = process.env.DOMAIN || "localhost:5000";

module.exports = config;
