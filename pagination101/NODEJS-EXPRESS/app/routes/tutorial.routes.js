module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const router = require("express").Router();
    
    //Retrieve all tutorials
    router.get("/", tutorials.findAll);

    //Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);


    app.use("/api/tutorials", router);
}