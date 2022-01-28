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


const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
})


// this proprety only exist on mongoose on the side of javascript not in the data base 
personSchema.virtual("fullName")
    .get(function () { return `${this.firstName} ${this.lastName}`; })
    .set(function (v) {
        // `v` is the value being set, so use the value to set
        // `firstName` and `lastName`.
        const firstName = v.substring(0, v.indexOf(" "));
        const lastName = v.substring(v.indexOf(" ") + 1);
        this.set({ firstName, lastName });
    });

personSchema.pre("save", async function () {
    this.firstName = "YOOOOOO";
    this.lastName = "MAMA";
    console.log("ABOUT TO SAVE!!");
})
personSchema.post("save", async function () {
    console.log("Just SAVE!!");
})

const Person = mongoose.model("Person", personSchema);



const doc = new Person();
doc.fullName = 'Jean-Luc Picard';


doc.fullName;
doc.firstName;
doc.lastName;



// ================================================================================================================================
// **** SET
// set takes the proprety (the value where setting for fullName)and then we can use that to update first and last (in this example)