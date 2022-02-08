const expressError = require("./utils/expressError")
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const catchAsync = require("./utils/catchAsync");
const { campgroundSchema } = require("./schemas.js");
const Review = require("./models/review");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const express = require("express");
const path = require("path");



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

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new expressError(400, msg)
    } else {
        next();
    }
};


//* ROUTES //* CRUD --->> order matter when putting your routes
app.get('/', (req, res) => {
    res.render('home')
});

app.get("/campgrounds", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds })
}));

// making new campgrounds
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})

app.post("/campgrounds", validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))


//* Showing campground by the id
app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
}))

//* Updating
app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
}));
app.put("/campgrounds/:id", validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

// delete will need to be changed to have the rights to do so
app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}));


//
app.post("/campgrounds/:id/reviews", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))



//* ==================
//*  error middleware
//* ==================
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not Found"))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Ohh No, Something Went Wrong!!!";
    res.status(statusCode).render("error", { err });
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
});