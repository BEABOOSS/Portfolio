const mongoose = require("mongoose");
const Product = require("./models/product");


// ==========================================================
// === file that will run on it's own anytime I just want ===
// ===        to get some new data in my data base        ===
// ==========================================================

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OHH NOOO MONGO CONNECTION ERROR!! :(");
        console.log(err);
    })

// const p = new Product({
//     name: "Ruby Grapefruit",
//     price: 1.99,
//     category: "fruit"
// })


// p.save().then(p => {
//     console.log(p)
// })
// .catch(err => {
//     console.log(err)
// })

const seedProducts = [
    {
        name: "Fairy Eggplat",
        price: 1.00,
        category: "vegetable"
    },
    {
        name: "Organic Goddess Melon",
        price: 4.99,
        category: "fruit"
    },
    {
        name: "Organic Mini Seedless Watermelon",
        price: 3.99,
        category: "fruit"
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: "vegetable"
    },
    {
        name: "Chocolate Whole Milk",
        price: 2.69,
        category: "dairy"
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })