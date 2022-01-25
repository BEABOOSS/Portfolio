const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const app = express();
const port = 3000;
uuid();

// PATCH REQUEST ===>>> patching a ressource either updating or adding on something to an existing ressource
// PUT REQUEST ===>>> The payload (the body) encludes a hole comment and we just replace what was already there in our data base with the new payload

// MIDLE WARE ===>>> added method override allows you to send methodes were your not suppose to. Like a form can send Patch now
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(methodOverride("_method"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))


// Using npm UUID to make an actual id instead of simple number(1,2,...) 
let comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "lol that is so funny!"
    },
    {
        id: uuid(),
        username: "Skyler",
        comment: "I like to go birwatching with my dog"
    },
    {
        id: uuid(),
        username: "Sk8erBoi",
        comment: "Plz delete your account, Todd"
    },
    {
        id: uuid(),
        username: "onlysaywoof",
        comment: "woof woof woof"
    }
]

//path to get the comments to display 
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments })
})

// Need 2 paths for the form 
// You have your get route to get you the form
app.get("/comments/new", (req, res) => {
    res.render("comments/new")
})
// You have a post to submit your data to a different path
// You now are also being redirected
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect("/comments")
})
// Getting the id and showing it with the comment
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const commented = comments.find(c => c.id === id);
    res.render("comments/show", { commented })
})

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const commented = comments.find(c => c.id === id);
    res.render("comments/edit", { commented })
})

// Taking the id from the URL -(first line)
// Then taking what was sent in the body.comment -(second line)
// then your finding a comment (with the same id) -(third line)
// you then update that comment with what was sent from *(second line)* -(fourth line)
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments")
})

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id );
    res.redirect("/comments");
})


app.get("/tacos", (req, res) => {
    res.send("GET /tacos response")
})

app.post("/tacos", (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`)
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


// // You don't have to always be using the same path(URL) and changing the verb(get, post, patch)
// // But you could also change the path(URL) and keep the same verb (POST)
// GET /comments - List all comments
// POST /comments - Creats a new comment
// GET /comments/:is - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment