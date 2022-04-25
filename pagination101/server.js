const express = require("express");
const db = require("./models");

const app = express();

db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch(err => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});


app.listen(3000, () => {
	console.log("server started on port 3000");
});
