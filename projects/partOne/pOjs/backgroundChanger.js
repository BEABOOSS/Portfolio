const button = document.querySelector("#colorChanger");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");

button.addEventListener("click", ()=>{
    const newColor = randomRGB();
    body.style.backgroundColor = newColor;
    h1.innerText = newColor;
});

const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};