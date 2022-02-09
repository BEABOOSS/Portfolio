const shleterRoutes = require("./routes/shelters");
const adminRoutes = require("./routes/admin");
const cookieParser = require("cookie-parser");
const dogsRoutes = require("./routes/dogs");
const session = require("express-session");
const express = require("express");
const app = express();


app.use(session({ secret: "thisisnotagoodsecret", resave: false, saveUninitialized: false }));

// app.use(cookieParser("thisismysecret"));
app.use("/shelters", shleterRoutes);
app.use("/dogs", dogsRoutes);
app.use("/admin", adminRoutes);





// app.get("/greet", (req, res) => {
//     const { name = "noname" } = req.cookies;
//     res.send(`Hey There, ${name}`);
// })
app.get("/setname", (req, res) => {
    res.cookie("name", "stevie chicks");
    res.send("OK SENT YOU A COOKIE!!!!!!");
})
app.get("/getsignedcookie", (req, res) => {
    res.cookie("fruit", "grape", { signed: true });
    res.send("OK SIGNED YOUR COOKIE");
})
// app.get("/verifyfruit", (req, res) => {
//     res.send(req.signedCookies);
// })


app.get("/viewcount", (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})





app.get("/register", (req, res) => {
    const { username = "Anonymous" } = req.query;
    req.session.username = username;
    res.redirect("/greet");
})

app.get("/greet", (req, res) => {
    const {username} = req.session;
    res.send(`Hey there, ${username}`)
})



app.listen(3000, () => {
    console.log("Serving app on localhost:3000");
})