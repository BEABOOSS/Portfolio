const db = require("../models");
const Tutorial = db.tutorials;
const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;
	return { limit, offset };
};

// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
	const { page, size, title } = req.query;
	const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
	const { limit, offset } = getPagination(page, size);
	Tutorial.paginate(condition, { offset, limit })
		.then((data) => {
			res.send({
				totalItems: data.totalDocs,
				tutorials: data.docs,
				totalPages: data.totalPages,
				currentPage: data.page - 1,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tutorials",
			});
		});
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
	const { page, size } = req.query;
	const { limit, offset } = getPagination(page, size);
	Tutorial.paginate({ published: true }, { offset, limit })
		.then((data) => {
			res.send({
				totalItems: data.totalDocs,
				tutorials: data.docs,
				totalPages: data.totalPages,
				currentPage: data.page - 1,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tutorials",
			});
		});
};
