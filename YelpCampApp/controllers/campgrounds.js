const Campground = require("../models/campground");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res, next) => {
	const perPage = 15;
	const page = req.params.page || 1;
	Campground
		.find({})
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec(function (err, campgrounds) {
			Campground.count().exec(function (err, count) {
				if (err) return next(err);
				res.render("campgrounds/index", {
					campgrounds: campgrounds,
					current: page,
					pages: Math.ceil(count / perPage),
				});
			});
		});
};

module.exports.renderNewForm = (req, res) => {
	res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
	const geoData = await geocoder
		.forwardGeocode({
			query: req.body.campground.location,
			limit: 1,
		})
		.send();
	const campground = new Campground(req.body.campground);
	campground.geometry = geoData.body.features[0].geometry;
	campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	campground.author = req.user._id;
	await campground.save();
	console.log(campground);
	req.flash("success", "Successfully made a new campground!");
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
	const campground = await Campground.findById(req.params.id)
		.populate({
			path: "reviews",
			populate: {
				path: "author",
			},
		})
		.populate("author");
	if (!campground) {
		req.flash("error", "Campground not found!");
		return res.redirect("/campgrounds");
	}
	res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground) {
		req.flash("error", "I Don't Know! I Didn't Find That One.");
		return res.redirect("/campgrounds");
	}
	res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
	const { id } = req.params;
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
	const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	campground.images.push(...imgs);
	await campground.save();
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
	}
	req.flash("success", "Successfully updated campground");
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash("success", "Successfully deleted campground");
	res.redirect("/campgrounds");
};

// module.exports.pagination = (req, res, next) => {
// 	const perPage = 15;
// 	const page = req.params.page || 1;

// 	Campground.find({})
// 		.skip(perPage * page - perPage)
// 		.limit(perPage)
// 		.exec(function (err, products) {
// 			Campground.count().exec(function (err, count) {
// 				if (err) return next(err);
// 				res.render("main/products", {
// 					products,
// 					current: page,
// 					page: Math.ceil(count / perPage),
// 				});
// 			});
// 		});
// };
