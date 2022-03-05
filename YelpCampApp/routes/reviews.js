const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/review");

// Making a review
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

// deleting reviews /pulling any matching ID of that array and deleting it 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;
