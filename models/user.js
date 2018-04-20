var   mongoose  = require("mongoose"),
      validator = require("validator"),
      bcrypt    = require("bcryptjs");

var userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate:{
            validator: (value) =>{
                return validator.isEmail(value);
            },
            message: "Not a valid Email"
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
});

//userSchema.plugin(passportLocalMongoose);

// Generating a hash
userSchema.methods.generateHash = function(password) {
    // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, (err, res) =>{
            return res;
        });
    });
};

module.exports = mongoose.model("User", userSchema);