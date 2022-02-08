const shleterRoutes = require("./routes/shelters");
const adminRoutes = require("./routes/admin");
const cookieParser = require("cookie-parser")
const dogsRoutes = require("./routes/dogs");
const express = require("express");
const app = express();


app.use(cookieParser());
app.use("/shelters", shleterRoutes);
app.use("/dogs", dogsRoutes);
app.use("/admin", adminRoutes);





app.get("/greet", (req, res) => {
    const {name = "noname"} = req.cookies;
    res.send(`Hey There,${name}`)
})
app.get("/setname", (req, res) => {
    res.cookie("name", "stevie chicks")
    res.send("OK SENT YOU A COOKIE!!!!!!")
})




app.listen(3000, () => {
    console.log("Serving app on localhost:3000");
})