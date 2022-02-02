const AppError = require("./AppError");
const express = require("express");
const morgan = require("morgan");
const app = express();

//* Middleware order MATTERS!!!!!!! 

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
app.use("/dogs", (req, res, next) => {
    console.log("I LOVE DOGS");
    next();
})


const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next();
    }
    throw new AppError(401, "Password required!")
    // res.send("SORRY YOU NEED A PASSWORD!!!!")
    // res.status(401)
}






app.get("/", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send("Home Page!")
})
app.get("/error", (req, res) => {
    chicken.fly();
})

app.get("/dogs", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send("Woof WOOff")
})

// you can pass in mutiple callbacks 
app.get("/secret", verifyPassword, (req, res) => {
    res.send("MY SECRET IS: Sometimes I wear headphones in public so I don't have to talk to anyone")
})

app.get("/admin", (req, res) => {
    throw new AppError(403, "You are not an  ADMIN")
})

app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
})

// app.use((err, req, res, next) => {
//     console.log("*********************************************");
//     console.log("*********************************************");
//     console.log("***************** ERROR *********************");
//     console.log("*********************************************");
//     console.log("*********************************************");
//     next(err);
// })

app.use((err, req, res, next) => {
    const { status = 500, message = "Something Went wrong" } = err;
    res.status(status).send(message)
})



app.listen(3000, () => {
    console.log("Serving on port 3000");
});