const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/authDemo")
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OHH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })



app.set("view engine", "ejs");
app.set("views", "views");

app.get("/register", (req, res) => {
    res.render("register");
})


app.get("/secret", (req, res) => {
    res.send("THIS IS SECRET, YOU CANNOT SEE ME UNLESS TOU ARE LOG IN!!!")
});





app.listen(3000, () => {
    console.log("Serving on port 3000");
});