const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const { array } = require("joi");
const upload = multer({ storage });

const Campground = require("../models/campground");

router.post(("/"), isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground))

//-------- IMPORTANT--------     
// must put the new route before the show page or else it thinks that new is an ID
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.get(("/:page"), catchAsync(campgrounds.index))

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;