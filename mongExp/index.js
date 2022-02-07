const methodOverride = require("method-override");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();

const Product = require("./models/product");
const Farm = require("./models/farm")

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OHH NOOO MONGO CONNECTION ERROR!! :(");
        console.log(err);
    })


app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//*==========================================================
//*====                                                  ====
//*====                 RESTFUL ROUTING                  ====
//*====                                                  ====
//*==========================================================


// FARM ROUTES
app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", { farms });
})

app.get("/farms/new", (req, res) => {
    res.render('farms/new')
})

app.get("/farms/:id", async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate("products");
    res.render("farms/show", { farm });
})
app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms")
})





// PRODUCTS ROUTS
app.get("/farms/:id/products/new", async(req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render("products/new", { categories, farm })
})


app.post("/farms/:id/products", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, categories } = req.body;
    const product = new Product({ name, price, categories });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`)
})



const categories = ['fruit', "vegetable", "dairy", "fungi"];

//* ================
//** HOME PRODUCT ** 
//* ================
app.get("/products", async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render("products/index", { products, category })
    } else {
        const products = await Product.find({})
        res.render("products/index", { products, category: "All" })
    }
})


//* ================
//**  NEW PRODUCT ** 
//* ================

app.get("/products/new", (req, res) => {
    res.render("products/new", { categories })
})

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})


//* ===================
//** Showing Product ** 
//* ===================

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id).populate("farm");
    res.render("products/show", { foundProduct });
})



//* ===================
//** EDITING PRODUCT ** 
//* ===================

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.render("products/edit", { foundProduct, categories })
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${updatedProduct._id}`)
})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
})






app.listen(3000, () => {
    console.log("Listening on port 3000");
})