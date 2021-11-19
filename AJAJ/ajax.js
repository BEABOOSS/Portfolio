// /**
//  * Implement the solution in this function
//  *
//  * @param {string} str The string of brackets.
//  * @returns {boolean} Whether or not the string is valid.
//  */
//  function isValid (str) {
//      const holder = [];
//      const openBrackets = ["(", "[", "{"];
//      const closedBrackets = [")", "]", "}"];
//      for (const letter of str) {
//          if(openBrackets.includes(letter)){
//              holder.push(letter)
//          } else if (closedBrackets.includes(letter)) {
//              const openPair = openBrackets[closedBrackets.indexOf(letter)]
//              if (holder[holder.length - 1]){
//                  holder.splice(-1,1)
//              } else {
//                  holder.push(letter)
//                  break;
//              }
//          }
//      }
//      return (holder.length === 0);
// }
// fetch("https://api.cryptonator.com/api/full/btc-usd")
//     .then( res => {
//         console.log("RESPONSE, WAITING TO PARSE... ", res);
//         return res.json()
//     })
//     .then(data => {
//         console.log("DATA  PARSED...");
//         console.log(data.ticker.price);
//     })
//     .catch(e => {
//         console.log("OH NO! ERROR!", e);
//     })

// const fecthbitcoinPrice = async () => {
//     try {
//         const res = await fetch("https://api.cryptonator.com/api/full/btc-usd");
//         const data = await res.json();
//         console.log(data.ticker.price);
//     }catch (e) {
//         console.log("SOMETHING WENT WRONG!!!!", e);
//     }
// }

// axios.get("https://api.cryptonator.com/api/full/btc-usd")
//     .then(res => {
//         console.log(res.data.ticker.price);
//     })
//     .catch(err => {
//         console.log("ERROR!!!!!", err);
//     })

// const fecthbitcoinPrice = async () => {
//     try {
//         const res = await axios.get("https://api.cryptonator.com/api/full/btc-usd");
//         console.log(res.data.ticker.price);
//     } catch(e){
//         console.log("ERROR!!!", e);
//     }
// }
const jokes = document.querySelector("#jokes");
const button = document.querySelector("button");

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLI = document.createElement("LI");
    newLI.append(jokeText);
    jokes.append(newLI);
}

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: "application/json" } };
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        return res.data.joke;
    } catch (e) {
        return "NO JOKES AVAILABLE!"
    }
}
button.addEventListener("click", addNewJoke)

const form = document.querySelector("#researchForm");



form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userInput = form.elements.query.value;
    const config = { params: { q: userInput} }
    const respond = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    displayImage(respond.data);
    form.elements.query.value ="";
})

const displayImage = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }

};