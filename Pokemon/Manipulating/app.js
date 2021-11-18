const allLinks = document.querySelectorAll('a');

// for (let link of allLinks) {
//     link.innerText = 'I AM A LINK!!!!'
// }


for (let link of allLinks) {
    link.style.color = 'rgb(0, 108, 134)';
    link.style.textDecorationColor = 'magenta';
    link.style.textDecorationStyle = 'wavy';
};

const btnV2 = document.querySelector("#v2");

btnV2.onclick = function () {
    console.log("You clicked me!!!");
    console.log("I hope It Worked");
};
const btnV3 = document.querySelector("#v3");
btnV3.addEventListener('click', () => {
    console.log("HI")
})