const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas.js");

const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");


const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};



router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds })
}));

// making new campgrounds
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
})

router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`)
}))


//* Showing campground by the id
router.get("/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");
    if(!campground){
        req.flash("error", "Campground not found!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}))

//* Updating
router.get("/:id/edit", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash("error", "I Don't Know! I Didn't Find That One. Recheck If You Entered The Right Thing.");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
}));
router.put("/:id", validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash("success", "Successfully updated campground");
    res.redirect(`/campgrounds/${campground._id}`);
}));

// delete will need to be changed to have the rights to do so
router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground")
    res.redirect("/campgrounds");
}));


module.exports = router;