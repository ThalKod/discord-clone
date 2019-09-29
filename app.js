const methodOverride = require("method-override");
const expressSession = require("express-session");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const flash = require("req-flash");
const User = require("./models/user");
const config = require("./config/config");
const passportStrategy = require("./config/passport");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const channelRoute = require("./routes/channel");
const ajaxRoute = require("./routes/ajax");
const chalk = require("chalk")
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configure IO
require("./io/index")(io);


// Configure app and mongoose
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// boot if db is available
mongoose.connect(config.dbURL, {
        useNewUrlParser: true, useCreateIndex: true
    })
    .then(() => {
        // boot
        server.listen(config.port, () => {
            console.log(chalk.greenBright(`\n\n>> listenning on port ${config.port} \n`));
        });
    })
    .catch((dbErr) => {
        console.log(chalk.redBright("DB Connection Error: ", dbErr.message));
        process.exit(1);
    });


// seedDB;

// Passport configuration
app.use((expressSession)({
    secret: "a4fw8542071f-c33873-443447-8ee2321",
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());

// Login Strategy
passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, passportStrategy.localSiginStrategy));

// Sign UP Strategy
passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, passportStrategy.localSignupStrategy));

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/", indexRoute);
app.use("/users", userRoute);
app.use("/channel", channelRoute);
app.use(ajaxRoute);
