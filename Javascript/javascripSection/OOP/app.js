// // function hex (r,g,b){
// //     return "#" + ((1<<24) + (r << 24) + (g<<8) + b).toString(16).slice(1);
// // }

// // function rgb(r,g,b){
// //     return `rgb(${r}, ${g}, ${b})`
// // }
// // 


// function makeColor(r, g, b) {
//     const color = {};
//     color.r = r;
//     color.g = g;
//     color.b = b;
//     color.rgb = function () {
//         const { r, g, b } = this;
//         return `rgb(${r}, ${g}, ${b})`;
//     };
//     // taken from Stack Overflow
//     color.hex = function () {
//         const { r, g, b } = this;
//         return "#" + ((1 << 24) + (r << 24) + (g << 8) + b).toString(16).slice(1);
//     }
//     return color;
// }

// const firstColor = makeColor(35, 255, 150);

// // 
// // Same function as show above but just with a constructor instead
// // 

// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }


// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
// }
// Color.prototype.hex = function () {
//     const { r, g, b } = this;
//     return "#" + ((1 << 24) + (r << 24) + (g << 8) + b).toString(16).slice(1);
// }
// Color.prototype.rgba = function (a = 1.0) {
//     const { r, g, b } = this;
//     return `rgba(${r}, ${g}, ${b}, ${a})`;
// }

// const color1 = new Color(49, 55, 155);
// color1.hex();
// const color2 = new Color(0, 0, 0)
// color2.hex();



//
//create a template for a color and also add methodes + classes
//

class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {
        return `rgb(${this.innerRGB()})`;
    }
    hex() {
        this.innerRGB();
        return (
            "#" + ((1 << 24) + (r << 24) + (g << 8) + b).toString(16).slice(1)
        );
    }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`
    }
    opposite() {
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`
    }
    calcHSL() {
        let { r, g, b } = this;
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax == g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
        h = Math.round(h * 60);

        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;

        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;

    }
}


const c1 = new Color(255, 68, 96, "tomato");
const c2 = new Color(11, 188, 46, 0.6, "YesHmmmHMHHmmmm");

class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating!`;
    }
}



class Cat extends Pet{
    constructor(name, age, livesLeft = 9){
        super(name,age);
        this.livesLeft = livesLeft;
    }
    meow() {
        return "MEOOWWWWWW!!!!!";
    }
}


class Dog extends Pet{
    bark() {
        return "WOOOFFFFF!!!!!!!";
    }
}