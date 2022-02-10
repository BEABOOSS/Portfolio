const expressError = require("./utils/expressError");
const campgrounds = require("./routes/campgrounds");
const methodOverride = require("method-override");
const reviews = require("./routes/reviews");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const express = require("express");
const path = require("path");
const app = express();



mongoose.connect('mongodb://localhost:27017/yelp-camp');

// checks if there is an error 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// if database opened prints :  
db.once("open", () => {
    console.log("Database connected");
});


app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))



// IMPORTING ROUTES 
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);






//* ROUTES //* CRUD --->> order matter when putting your routes
app.get('/', (req, res) => {
    res.render('home')
});





//* ==================
//*  error middleware
//* ==================
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not Found"))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Ohh No, Something Went Wrong!!!";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Serving on port 3000");
});