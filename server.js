require("dotenv").config();
const connectDb = require("./config/db")
const errorHandler = require("./middleware/errormiddleware")
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
const app = express();

const PORT = 7000;



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin")
    next()
})

app.use("/task", taskRoutes);

app.get("/", (req, res) => console.log("Hello Teddy!"))

connectDb();

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Database Connected");

    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
})