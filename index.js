const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser')
const express = require('express')
const flash = require('express-flash')
const morgan = require('morgan')
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

const mongoose = require('mongoose');


const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(flash());


// Use the routers

app.use('/project', projectRoutes);
app.use('/auth', authRoutes);



// connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Projects Connected to MongoDB"))
  .catch((err) => console.log(err));

// setting up the express server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));









