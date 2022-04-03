const express = require("express");
const mongoose = require("mongoose");
const User = require("./usermodel.js");
const app = express();

mongoose.connect("mongodb://localhost:27017/pagination");

// checks if there is an error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// if database opened prints :
db.once("open", async () => {
	if ((await User.countDocuments().exec()) > 0) return console.log("user already inserted to database");

	Promise.all([
		User.create({ name: "user1" }),
		User.create({ name: "user2" }),
		User.create({ name: "user3" }),
		User.create({ name: "user4" }),
		User.create({ name: "user5" }),
		User.create({ name: "user6" }),
		User.create({ name: "user7" }),
		User.create({ name: "user8" }),
		User.create({ name: "user9" }),
		User.create({ name: "user10" }),
	])
		.then(() => console.log("Added users to database"))
		.catch(() => console.log("error occurred while inserting data to database"));
});

// const users = [
// 	{ id: 1, name: "user1" },
// 	{ id: 2, name: "user2" },
// 	{ id: 3, name: "user3" },
// 	{ id: 4, name: "user4" },
// 	{ id: 5, name: "user5" },
// 	{ id: 6, name: "user6" },
// 	{ id: 7, name: "user7" },
// 	{ id: 8, name: "user8" },
// 	{ id: 9, name: "user9" },
// 	{ id: 10, name: "user10" },
// ];

function paginate(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const result = {};
  // change model.length to model.countDocuments() because you are counting directly from mongodb
      if (endIndex < (await model.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      try {
  //       .limit(limit).skip(startIndex) replaced the slice method because 
  //       it is done directly from mongodb and they are one of mongodb methods
        result.results = await model.find().limit(limit).skip(startIndex);
        res.paginatedResult = result;
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }
// app.get("/posts", paginate(posts), (req, res) => {
//     res.json(res.paginatedResult);
// });

app.get("/users", paginate(users), (req, res) => {
	res.json(res.paginatedResult);
});

app.listen(3000, () => {
	console.log("server started on port 3000");
});
