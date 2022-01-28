const mongoose = require("mongoose");


// *Sends error when error happends*
mongoose.connect('mongodb://localhost:27017/movieApp')
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OHH NOOO  THERE IS AN ERROR!! :(");
        console.log(err);
    })


//* A Schema is a mapping of different collections keys from mongo to different types in JS
// taking data from mongo which has different types that JS may have or may not have (by defining this schema we can specify what they are)
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String

});
//* Mongoose will take ("Movie") and create a collection in mongoose (***note: when chosing the name("Movie") first letter captital and singular)
// put it to a variable (has the name as in the paranthese) and that creates you a class
const Movie = mongoose.model("Movie", movieSchema);

// this does nothing to the data base(like its not created or inserted)
// const amadeus = new Movie({ title: "Amadeus", year: 1986, score: 9.2, rating: "R" });


// * IF YOU INSERT __ONE THING__ AT A TIME (SHOW ON TOP ^^^^) YOU NEED TO USE A .SAVE() SO LIKE THAT YOUR DATA IS SAVED
// * iF YOU INSERT __MUTIPLE__ AT A TIME YOUR BASICALLY DIRECT LINE INSERT TO MONGO (SO NEED TO USE A .SAVE() HERE)

// this is the same thing to ^^^^
// Movie.insertMany([
//     { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
//     { title: "Alien", year: 1979, score: 8.1, rating: "R" },
//     { title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG" },
//     { title: "Stand By Me", year: 1986, score: 8.6, rating: "R" },
//     { title: "Moonrise Kingdom", year: 2012, score: 7.3, rating: "PG-13" }
// ])
//     .then(data => {
//         console.log("IT WORKED!!")
//         console.log(data);
//     })