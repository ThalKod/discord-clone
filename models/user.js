const   mongoose  = require("mongoose");
const   validator = require("validator");
// const   _         = require("lodash");

 const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
        validate: {
            validator: value=>validator.isEmail(value),
            message: "Not a valid Email",
        },
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
    }],
    profile_picture: {
        type: String,
        default: "/img/placeholder.png",
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

// userSchema.plugin(passportLocalMongoose);

// // Generating a hash
// userSchema.methods.generateHash = function(password) {
//     // return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//     bcrypt.genSalt(10, (err, salt) =>{
//         bcrypt.hash(password, salt, (err, res) =>{
//             return res;
//         });
//     });
// };

// userSchema.methods.toJSON = ()=>{
//     const user = this;
//     const userObj = user.toObject();
//     return _.pick(userObj, ["_id"]);
// };


module.exports = mongoose.model("User", userSchema);
