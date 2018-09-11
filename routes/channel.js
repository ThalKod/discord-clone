const   express     = require("express");
const   { ObjectID } = require("mongodb");
const   moment      = require("moment");
const   multer      = require("multer");
const   mime        = require("mime-types");
const   path        = require("path");
const   crypto      = require("crypto");
const   User        = require("../models/user");
const   middleware  = require("../middleware/index");
const   Channel     = require("../models/channel");

const       router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../public/files/image"),
        filename: (req, file, cb)=>{
            crypto.pseudoRandomBytes(4, (err, raw)=>{
                const mimeType = mime.lookup(file.originalname);
                // throw away any extension if provided
                const nameSplit = file.originalname.split(".").slice(0, -1);
                // nameSplit.pop();

                // replace all white spaces with - for safe file name on different filesystem
                const name = nameSplit.join(".").replace(/\s/g, "-");
                cb(null, raw.toString("hex") + name + "." + mime.extension(mimeType));
            });
        },
    }),
});

router.post("/new", middleware.isLogedIn, upload.single("channel_picture"), (req, res)=>{
    if(!ObjectID.isValid(req.user._id)){
        return res.redirect("/");
    }

    const channel = {
        creator: req.user._id,
        channel_name: req.body.channel_name,
    };

    if(req.file){
        const file = {
            path: "/files/image/" + req.file.filename,
        };

        channel.channel_picture = file.path;
    }

    User.findById(req.user._id).then((rUser)=>{
        if(!rUser){
            return res.redirect("/");
        }

        Channel.create(channel).then((rChannel)=>{
            rUser.channels.push(rChannel._id);
            rUser.save();

            rChannel.participant.push(rUser._id);
            // rChannel.online
            rChannel.save();
            res.redirect(`/channel/${rChannel._id}`);
        }).catch((e)=>{
            console.log(e);
            res.redirect("back");
        });
    });
});


router.get("/join/:id", (req, res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.redirect("/");
    }

    Channel.findById(ObjectID(req.params.id)).populate("participant").then((rChannel)=>{
        if(!rChannel){
            res.redirect("/");
        }

        res.render("join", { channel: rChannel, title: "join" });
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
});

router.post("/join/:id", middleware.isLogedIn, (req, res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.redirect("/");
    }

    Channel.findById(ObjectID(req.params.id)).then((rChannel)=>{
        if(!rChannel){
            res.redirect("/");
        }
        const numberUser = rChannel.participant.length;
        for(let i = 0; i < numberUser; i++){
            if(rChannel.participant[i].equals(ObjectID(req.user._id))){
                return res.redirect(`/channel/${rChannel._id}`);
            }
        }
        User.findById(req.user._id).then((rUser)=>{
            rUser.channels.push(rChannel._id);
            rUser.save();

            rChannel.participant.push(req.user._id);
            rChannel.save();
            return res.redirect(`/channel/${rChannel._id}`);
        });
    }).catch((e)=>{
        console.log(e);
        res.redirect("/");
    });
});

router.get("/:id", middleware.isLogedIn, middleware.isChannelParticipant, (req, res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.redirect("/");
    }

    Channel.findById(ObjectID(req.params.id)).populate({ path: "message", populate: { path: "author" } }).populate("participant").limit(10).sort({date:-1}).then((rChannel)=>{
        if(!rChannel){
            return res.redirect("/");
        }


        User.findById(req.user._id).populate("channels").then((rUser)=>{
            res.render("chat", { channel: rChannel, channels: rUser.channels, title: rChannel.channel_name, moment });
        });
    })
    .catch((e)=>{
        res.redirect("/");
        console.log(e);
    });
});


module.exports = router;
