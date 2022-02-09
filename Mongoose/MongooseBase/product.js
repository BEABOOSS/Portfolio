const mongoose = require("mongoose");


// *Sends error when error happends*
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OHH NOOO  THERE IS AN ERROR!! :(");
        console.log(err);
    })

// 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Why No Name?"],
        maxlength: 20
    },
    price: {
        type: Number,
        required: [true, "It Ain't Free!! You Must Put A Price"],
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ["S", "M", "L", "XL"]
    }
});


//* when making your own method using a traditional funcition like you need to be using the key word "this"

//* intance models are for individual product in this casse
// the key word "this" here refers to the actual product it self
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save()
};
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
};


// * statics method are for mutiple product at a time
// the key word "this" here the entire model here
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model("Product", productSchema);



const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: "Mountain Bike" });
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory("Outdoors");
    console.log(foundProduct);

};

Product.fireSale()
    .then(res => {
        console.log(res);
    })

// findProduct();

// const bike = new Product({ name: "Cycling Jersey", price: 29.50, categories: ["Cycling"], size:"S" })
// bike.save()
//     .then(data => {
//         console.log("IT WORKED");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OHHHH NO ERROR!");
//         console.log(err);
//     })


/*
// *When you use an .update to change a value that's going agaisnt your Schema you need to use runValidators
// to make sure that your not entering wrong information
Product.findOneAndUpdate({ name: "Mountain Baike" }, {name: "Mountain Bike"}, { new: true, runValidators: true })
    .then(data => {
        console.log("IT WORKED");
        console.log(data);
    })
    .catch(err => {
        console.log("OHHHH NO ERROR!");
        console.log(err);
    })
*/