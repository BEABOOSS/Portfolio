const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const { validateReview } = require("../middleware");
const catchAsync = require("../utils/catchAsync");




// Making a review
router.post("/", validateReview, catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created New Review")
    res.redirect(`/campgrounds/${campground._id}`);
}))

// deleting reviews /pulling any matching ID of that array and deleting it 
router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted Review")
    res.redirect(`/campgrounds/${id}`);
}))


module.exports = router;
