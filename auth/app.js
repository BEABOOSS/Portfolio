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

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login")
    }
    next();
}

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
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/");
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/login", async (req, res) => {
    const { password, username } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect("/secret");
    } else {
        res.redirect("/login");

    }
});

app.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/login");
})

app.get("/secret", requireLogin, (req, res) => {
    res.render("secret");
});

app.get("/topsecret", requireLogin, (req, res) => {
    res.send("TOP SECRET!!!")
})





app.listen(3000, () => {
    console.log("Serving on port 3000");
});