const expressError = require("./utils/expressError")
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const catchAsync = require("./utils/catchAsync")
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const express = require("express");
const path = require("path");
const joi = require("joi");
const { join } = require("path");

mongoose.connect('mongodb://localhost:27017/yelp-camp');

// checks if there is an error 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// if database opened prints :  
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));




//* ROUTES //* CRUD --->> order matter when putting your routes

app.get("/campgrounds", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds })
}))

// making new campgrounds
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})
app.post("/campgrounds", catchAsync(async (req, res) => {
    // if (!req.body.campground) throw new expressError(404, "Invalid Campground Data");
    const campgroundSchema = joi.object({
        campground: joi.object({
            title: joi.string().required(),
            price: joi.number().required().min(0),
            image: joi.string().required,
            location: joi.string().required(),
            description: joi.string().required()
        }).required()
    })
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new expressError(400, msg)
    }
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

//* Showing campground by the id
app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const campground = catchAsync(await Campground.findById(req.params.id));
    res.render("campgrounds/show", { campground });
}))

//* Updating
app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
}))
app.put("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}))
// delete will need to be changed to have the rights to do so
app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}))

// error middleware

app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not Found"))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Ohh No, Something Went Wrong!!!";
    res.status(statusCode)
        .render("./error", { err });
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
});