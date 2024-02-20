const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY
const User = require("../models/user");


exports.authUser = async function authUser(req, res, next) {
    const tokenToDecode = req.cookies.token; 
    if (!tokenToDecode) {
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
        req.codedToken = tokenToDecode;
        userIdToFind = req.decodedToken.userId;
          // you need to create a user model
        const user = await user.findOne({ _id: userIdToFind });
        const username = user.username;

        req.currentUser = username;
        req.success = true;
        next();
      } catch (err) {
        console.log(err);
      }
    }
  };
  