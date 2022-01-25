const express = require("express");
const path = require("path");
const redditData = require("./data.json")
const app = express();
const port = 3000;

app.use(express.static("public"))
// directory should be like this:
// public
//  /css
//  /js
//  /img

// allows you to create ejs file
app.set("view engine", "ejs");
// allows you to start the index.js file from anywhere like you don't need to be in that directory 
app.set("views", path.join(__dirname, "/views"))


app.get("/", (req, res) => {
    res.render('home')
})

// IMAGINE THAT THE CAT ARRAY IS COMING FROM A DATA BASE
app.get("/cats", (req, res) => {
    const cats = [
        "Blue", "Rocket", "Monty", "Stephanie", "Winston"
    ];
    res.render("cats", { cats })
})

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render("subreddit", { ...data })
    } else {
        res.render("notfound", { subreddit })
    }
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random", { num })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})