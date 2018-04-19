const express = require("express");
const config  = require("./config/config");

var app = express();

app.use(express.static(__dirname + "public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/users/:id", (req, res)=>{
    res.send("User profile of id: " + req.params.id);
})

//Login Routes
app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", (req, res) =>{
    console.log("login the user...");
    res.redirect("/users/" + 12324);
});

//Register Routes
app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register", (req, res) =>{
    console.log("register and login the user...");
    res.redirect("/users/" + 12325);
});

app.listen(config.port, ()=>{
    console.log("Server Listening at " + config.port);
});