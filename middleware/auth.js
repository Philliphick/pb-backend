

const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY
const user = require("../models/user");


exports.authUser = async function authUser(req, res, next) {
    console.log("authUser middleware called");
    const tokenToDecode = req.cookies.token; 
    console.log("req.cookies", req.cookies)
    
    if (!tokenToDecode) {
      console.log("no token found");
      return res.sendStatus(403);
    } else {
      try {
        const decoded = jwt.verify(
          tokenToDecode,
          secretKey,
          function (err, decode) {
            if (err) {
              res.sendStatus(403);
            } else {
              return decode;
            }
          }
        );

        req.decodedToken = decoded;
        console.log(req);
        req.codedToken = tokenToDecode;
        userIdToFind = req.decodedToken.userId;
          // you need to create a user model
        const foundUser = await user.findOne({ _id: userIdToFind });
        const username = foundUser.username;
          console.log(username)
        req.currentUser = username;
        req.success = true;
        next();
      } catch (err) {
        console.log(err);
      }
    }
  };
  