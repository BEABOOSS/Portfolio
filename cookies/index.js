const shleterRoutes = require("./routes/shelters");
const adminRoutes = require("./routes/admin");
const dogsRoutes = require("./routes/dogs");
const express = require("express");
const app = express();



app.use("/shelters", shleterRoutes);
app.use("/dogs", dogsRoutes);
app.use("/admin", adminRoutes);


app.listen(3000, () => {
    console.log("Serving app on localhost:3000");
})