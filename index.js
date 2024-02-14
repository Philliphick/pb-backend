const cookieParser = require('cookie-parser')
const express = require('express')
const flash = require('express-flash')
const morgan = require('morgan')
// import { generalErrorHandler, notFoundHandler } from './errorMiddleware';
const router = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
// import routes from './routes/index';
const { notFoundHandler, generalErrorHandler } = require('./src/middleware/errorMiddleware');
const { checkJwt } = require('./src/middleware/authMiddleware');
const mongoose = require('mongoose');


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use('/api', checkJwt, routes);

app.use(notFoundHandler);
app.use(generalErrorHandler);

// connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Projects Connected to MongoDB"))
  .catch((err) => console.log(err));

// setting up the express server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));














// const express = require("express");
// const cors = require("cors");
// require("dotenv").config({});
// const mongoose = require("mongoose");
// const { auth, requiresAuth } = require('express-openid-connect');

// const app = express();

// // const PORT = 'https://project-board-backend.onrender.com' || 5001
// // IMPORT SCHEMAS

// const router = require("./routes/projectRoutes");
// const authRoutes = require("./routes/authRoutes");

// // config of auth routes FILL IN - must add these into env!
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: 'http://localhost:5001',
//     clientID: 'WA1O61U8g03x9KnUxhNQnNGe8jBm90wD',
//     issuerBaseURL: 'https://dev-jnsgeotm4fvfy4q3.us.auth0.com',
//     secret: '2mjX7JowgnPP2G-b3EGiBdpmQrOwDDU0p6I5-sB42L3SzeKtQ1QToi9njJ17VqWj'
//   };

// // connect to database

// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => console.log("Projects Connected to MongoDB"))
//     .catch((err) => console.log(err));


    
//     //setting up the express server

// // auth router attaches /login, /logout, and /callback routes to the baseURL   
// app.use(auth(config));
// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
//   });

// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
//   });

// app.use(express.json());
// app.use(cors());
// app.use(router);
// app.use('/api/auth', authRoutes);

// const port = process.env.PORT || 5001;
// app.listen(port, () => console.log(`Server started on port ${port}`));



