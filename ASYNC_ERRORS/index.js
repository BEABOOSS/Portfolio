const methodOverride = require("method-override");
const AppError = require("./AppError");
const mongoose = require("mongoose");
const express = require("express");
// const morgan = require("morgan");
const path = require("path");
const app = express();

const Product = require("./models/product");

mongoose.connect('mongodb://localhost:27017/farmStand2')
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

// app.use(morgan('dev'));

//*==========================================================
//*====                                                  ====
//*====                 RESTFUL ROUTING                  ====
//*====                                                  ====
//*==========================================================
function wrapAsync(func) {
    return function (req, res, next) {
        func(req, res, next).catch(e => next(e))
    }
}




const categories = ['fruit', "vegetable", "dairy", "fungi"];

//* ================
//** HOME PRODUCT ** 
//* ================
app.get("/products", wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render("products/index", { products, category })
    } else {
        const products = await Product.find({})
        res.render("products/index", { products, category: "All" })
    }

}))


//* ================
//**  NEW PRODUCT ** 
//* ================

app.get("/products/new", (req, res) => {
    res.render("products/new", { categories })
})

app.post("/products", wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
}))


//* ===================
//** Showing Product ** 
//* ===================

app.get("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id)
    if (!foundProduct) {
        throw new AppError(404, "Product Not Found");
    }
    res.render("products/show", { foundProduct })
}))



//* ===================
//** EDITING PRODUCT ** 
//* ===================

app.get("/products/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id)
    if (!foundProduct) {
        new AppError(404, "Product Not Found");
    }
    res.render("products/edit", { foundProduct, categories })
}))

app.put("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${updatedProduct._id}`)
}))

app.delete("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
}))

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(400 ,`Validation Failed... ${err.message}`)
}


app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === "ValidationError") err = handleValidationErr(err)
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something Went wrong" } = err;
    res.status(status).send(message);
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})