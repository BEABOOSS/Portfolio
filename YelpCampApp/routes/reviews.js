const { reviewSchema } = require("../joi/schemas.js");
const expressError = require("../utils/expressError");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const express = require("express");


const router = express.Router({ mergeParams: true });



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new expressError(400, msg)
    } else {
        next();
    }
};

// Making a review
router.post("/", validateReview, catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

// deleting reviews /pulling any matching ID of that array and deleting it 
router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))


module.exports = router;
