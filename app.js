const expressSession   = require("express-session");
const User           = require("./models/user");
const bodyParser     = require("body-parser");
const express        = require("express");
const config         = require("./config/config");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const mongoose       = require("mongoose");
const passportStrategy = require("./config/passport");
const socketIO       = require("socket.io");
const http           = require("http");
const indexRoute     = require("./routes/index");
const userRoute      = require("./routes/user");
const methodOverride = require("method-override");
const channelRoute   = require("./routes/channel");

const app            = express();
const server         = http.createServer(app);
const io             = socketIO(server);

require("./io/index")(io);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// Mongoose config
mongoose.connect(config.dbURL, (err)=>{
    if(err){
        throw err;
    }
});
mongoose.Promise = global.Promise;

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
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoute);
app.use("/users", userRoute);
app.use("/channel", channelRoute);


server.listen(process.env.PORT || 5000, ()=>{
    console.log("listenning on 5000");
});
