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
    if(password==="chickennugget") {
        next();
    }
    res.send("SORRY YOU NEED A PASSWORD!!!!")
}

// app.use((req, res, next) => {
//     console.log("THIZ THE FIRST");
//     next();
// })
// app.use((req, res, next) => {
//     console.log("THIZ THE SECOND");
//     next();
// })


app.get("/", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send("Home Page!")
})

app.get("/dogs", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send("Woof WOOff")
})

// you can pass in mutiple callbacks 
app.get("/secret", verifyPassword, (req, res) => {
    res.send("MY SECRET IS: Sometimes I wear headphones in public so I don't have to talk to anyone")
})

app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
});