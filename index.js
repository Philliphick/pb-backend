const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
// IMPORT SCHEMAS

const router = require("./routes/projectRoutes");


// connect to database

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Projects Connected to MongoDB"))
    .catch((err) => console.log(err));


    
    //setting up the express server

    const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


app.listen(5000, () => console.log("Server started on port 5000"));

