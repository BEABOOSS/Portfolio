// ==================================================================
// ==================================================================
// ==== We receive request but were not responding with anything ====
// ==================================================================
// ==================================================================

// 1- you first need to require express
const express = require("express");

// 2- then you need to call express (function) to be able to add methods to it
const app = express();

// 3- you then need to specify which you'll be listening on
const port = 8080;

// // anytime we get a request this code runs
// // we use .send() to send a response
// app.use((req, res) => {
//     console.log("WE got a new request")
//     res.send()
// })


app.get("/", (req, res) => {
    res.send("Welcome to our home page!!!")
})


// witht the collan ":" you can make your search result wider 
// like you don't have to add all the subreddits manually or all the postId manually 
app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})
app.get("/r/:subreddit/:postId", (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})



app.post("/cats", (req, res) => {
    res.send("MEOOOWWWWWWW!!!!!!!!!!!!, THIS IS DIFFERENT FROM A GET REQUEST!!!!!!!!!")
})

app.get("/cats", (req, res) => {
    res.send("MEOOOWWWWWWW!!!!!!!!!!!!")
})

app.get("/dogs", (req, res) => {
    res.send("WOOFF, WoooooooOOOOOFFFFFFF")
})
app.get("/search", (req, res) => {
    console.log(req.query);
    res.send("HI!")
})

// app.get with the star(*) is a safety nett were if you get an unknow request it just sends out .send() no matter the req 
// SO IF YOU PUT A * IN YOUR NAME PUT THE * AT THE END OF ALL YOUR .get !!!!!!!!!!!!!!
app.get("*", (req,res) => {
    res.send("I don't understand try something else please")
})
// /cats => "meow";
// /dogs => "woof woof";
// "/" => "welcome to our home page"

// you need to listen on a port to receive your request
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
