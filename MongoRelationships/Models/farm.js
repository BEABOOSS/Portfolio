const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/relatioinshipDemo")
    .then(() => {
        console.log("MONGO CONNECTION OPEN");
    })
    .catch(err => {
        console.log("OH NOOOO MONGO CONNECTION ERROR!!!");
        console.log(err);
    })


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["summer", "fall", "spring", "winter"]
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
})



const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//     {name: "Goddess Melon", price: 4.99, season: "summer"},
//     {name: "Sugar Baby Watermelon", price: 4.99, season: "summer"},
//     {name: "Asparagus", price: 3.99, season: "spring"}
// ])


// const makeFarm = async () => {
//     const farm = new Farm({ name: "Full Belly Farm", city: "Guinda, CA" });
//     const melon = await Product.findOne({name: "Goddess Melon"});
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }
// makeFarm();

const addProduct = async () => {
    const farm = new Farm({ name: "Full belly Farms" });
    const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}
addProduct();