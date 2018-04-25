const expressSession   = require("express-session"),
      User           = require("./models/user"),
      bodyParser     = require("body-parser"),
      express        = require("express"),
      config         = require("./config/config"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      mongoose       = require("mongoose"),
      bcrypt         = require("bcryptjs"),
      passportStrategy = require("./config/passport"),
      middleware     = require("./middleware/index"),
      socketIO       = require("socket.io"),
      http           = require("http"),
      indexRoute     = require("./routes/index"),
      userRoute      = require("./routes/user"),
      channelRoute   = require("./routes/channel"),
      methodOverride = require("method-override");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
require("./io/index")(io);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


//Mongoose config
mongoose.connect(config.dbURL, function(err){
    if(err){
        throw err;
    }
});
mongoose.Promise = global.Promise;

//Passport configuration
app.use((expressSession)({
    secret: "a4fw8542071f-c33873-443447-8ee2321",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//Login Strategy
passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},passportStrategy.localSiginStrategy));

//Sign UP Strategy
passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},passportStrategy.localSignupStrategy));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use("/", indexRoute);
app.use("/users", userRoute);
app.use("/channel", channelRoute);


server.listen(5000, ()=>{
    console.log("listenning on 5000");
});