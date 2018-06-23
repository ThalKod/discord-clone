const bcrypt         = require("bcryptjs");
const User           = require("../models/user");

const  localSignupStrategy = (req, email, password, done)=>{
    if(email){
      email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
    }
    // asynchronous
    process.nextTick(()=>{
        // if the user is not already logged in:
        if(!req.user) {
            User.findOne({ email }, (err, user)=>{
                // if there are any errors, return the error
                if(err){
                    return done(err);
                }
                // check to see if theres already a user with that email
                if(user){
                    return done(null, false, { message: "User already registered" });
                }else{
                    bcrypt.genSalt(10, (errC, salt)=>{
                        bcrypt.hash(password, salt, (errCrypt, res)=>{
                            const newUser  = {
                                email,
                                password: res,
                            };
                                User.create(newUser, (rErr, rUser)=>{
                                if(rErr){
                                    return done(rErr);
                                }

                                return done(null, rUser);
                            });
                        });
                    });
                }
    });
        // if the user is logged in but has no local account...
        }else if(!req.user.email){
// ...presumably they're trying to connect a local account
// BUT let's check if the email used to connect a local account is being used by another user
            User.findOne({  email }, (err, rUser)=>{
                if(err){
                    return done(err);
                }
                if(rUser){
                    return done(null, false);
// Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                }else{
                    bcrypt.genSalt(10, (errC, salt)=>{
                        bcrypt.hash(password, salt, (errCrypt, res)=>{
                            const newUser  = req.user;

                            newUser.email = email;
                            newUser.password = res;

                            User.create(newUser, (rErr, rUser2)=>{
                                if(err){
                                    return done(err);
                                }

                                return done(null, rUser2);
                            });
                        });
                    });
                }
            });
        }else{
// user is logged in and already has a local account. Ignore signup.
// (You should log out before trying to create a new account, user!)
            return done(null, req.user);
        }
    });
};

const  localSigninStrategy = (req, email, password, done)=>{
    if(email){
     email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
    }

    // asynchronous
    process.nextTick(()=>{
        User.findOne({ email }, (err, user)=>{
            // if there are any errors, return the error
            if(err){
                return done(err);
            }
            // if no user is found, return the message
            if(!user){
                return done(null, false);
            }

                bcrypt.compare(password, user.password, (errC, res)=>{
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
