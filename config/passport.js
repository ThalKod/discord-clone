const passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      User           = require("../models/user");
      bcrypt         = require("bcryptjs");

var localSignupStrategy = function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
        // if the user is not already logged in:
        if (!req.user) {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false);
                } else {

                    bcrypt.genSalt(10, (err, salt) =>{
                        bcrypt.hash(password, salt, (err, res) =>{
                            var newUser  = {
                                email : email,
                                password: res
                            };
                                                        
                            User.create(newUser, (err, rUser)=>{
                                if(err){
                                    return done(err);
                                }

                                console.log(rUser);
                                return done(null, rUser);
                            });
                        });
                    });
                }

            });
        // if the user is logged in but has no local account...
        } else if ( !req.user.email ) {
            // ...presumably they're trying to connect a local account
            // BUT let's check if the email used to connect a local account is being used by another user
            User.findOne({ 'email' :  email }, function(err, user) {
                if (err)
                    return done(err);
                
                if (user) {
                    return done(null, false);
                    // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                } else {
                    bcrypt.genSalt(10, (err, salt) =>{
                        bcrypt.hash(password, salt, (err, res) =>{
                            var user = req.user;

                            user.email = email;
                            user.password = res;

                            User.create(newUser, (err, rUser)=>{
                                if(err){
                                    return done(err);
                                }

                                console.log(rUser);
                                return done(null, rUser);
                            });
                        });
                    });
                }
            });
        } else {
            // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
            return done(null, req.user);
        }

    });

};

var localSigninStrategy = function(req, email, password, done) {
    if (email)
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false);

                bcrypt.compare(password, user.password, (err, res) =>{
                    if(res){
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                });    
        });
    });

};

module.exports.localSignupStrategy = localSignupStrategy;
module.exports.localSiginStrategy = localSigninStrategy;