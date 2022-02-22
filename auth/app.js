const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose.connect("mongodb://localhost:27017/authDemo")
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OHH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    });



app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }))

app.get("/", (req, res) => {
    res.send("THIS THE HOME PAGE!");
})

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hash });
    await user.save();
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/login", async (req, res) => {
    const { password, username } = req.body;
    const user = await User.findOne({ username });
    const validePassword = await bcrypt.compare(password, user.password);
    if (validePassword) {
        
        res.send("YAY WELCOME");
    } else {
        res.send("TRY AGAIN!");

    }
})


app.get("/secret", (req, res) => {
    res.send("THIS IS SECRET, YOU CANNOT SEE ME UNLESS TOU ARE LOG IN!!!")
});





app.listen(3000, () => {
    console.log("Serving on port 3000");
});