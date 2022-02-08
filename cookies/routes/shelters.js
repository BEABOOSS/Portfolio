const express = require("express");
const router = express.Router();




router.get("/", (req, res) => {
    res.send("all shelters")
})
router.post("/", (req, res) => {
    res.send("CREATING SHELTER")
})
router.get("/:id", (req, res) => {
    res.send("VEWING ONE shelter")
})
 
router.get("/:id/edit", (req, res) => {
    res.send("EDITING ONE SHELTER")
})


module.exports = router;

