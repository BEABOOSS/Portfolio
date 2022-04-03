require("dotenv").config();
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const dbUrl =  process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl);

// checks if there is an error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// if database opened prints :
db.once("open", () => {
	console.log("Database connected");
});

//* You pass in the array and returns a random element from the array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

//* making x amount of location to the DB
const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "6237933a847ece18234e49cc",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel ut, blanditiis eaque veniam cumque adipisci eos, atque ipsa facilis eius quaerat sed asperiores et alias! Impedit maxime distinctio vel numquam.",
			price,
			geometry: {
				type: "Point",
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dqdaf6ffk/image/upload/v1647970909/YelpCamp/x5ebwdjskycqic29n8d5.jpg",
					filename: "YelpCamp/x5ebwdjskycqic29n8d5",
				},
			],
		});
		await camp.save();
	}
};

//* Close the connection to the DB after running
seedDB().then(() => {
	mongoose.connection.close();
});
