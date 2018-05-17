const config = {};

config.port = process.env.PORT || 5000;
config.dbURL = process.env.DATABASEURL || "mongodb://localhost/minicord";

module.exports = config;
