const   express     = require("express");
const   { ObjectID } = require("mongodb");
const   User        = require("../models/user");
const   middleware  = require("../middleware/index");
const   Channel     = require("../models/channel");

const   router = express.Router();


router.get("/current/channel/:id", (req, res)=>{
    console.log("get request");
    Channel.findById(req.params.id).then((rChannel)=>{
        res.send(rChannel);
    });
});

module.exports = router;
