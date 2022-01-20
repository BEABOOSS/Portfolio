// example of required directory 
const cats = require("shelter")

// =========
// if you require a file you must say what your exporting (using module.exports) when refering your own file from the same directory you need to use ./filename

module.exports.add = (x,y) => x+y;

module.exports.PI = 3.14159;

exports.square = x => x*x;


// const math = {
//     add: this.add,
//     PI: this.PI,
//     square: this.square
// }
// module.exports = math;


// can just use exports.xxx but if exports is assign to something else 
// exports = "lskdfjgl;skdjfg;lksjdf;lgkjsd;lk"
// now you exports are fucked you can't use it now 



console.log("REQUIRED AN ENTIRE DIRECTORY!!!", cats);