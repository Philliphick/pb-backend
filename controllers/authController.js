const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require('dotenv').config();

const saltRounds = 12;

const Users = require("../models/user");

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
const secretKey = process.env.SECRET_KEY;


exports.register = async function (req, res, next) {
  try {
    const { username, password } = req.body; // request from frontend

    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }
    if (!regexPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-20 characters long and contain at least one letter, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds); // takes password and hashes the password, encryption
    // you need to create a user model
    const newUser = new Users({ 
    // name: req.body.name,
    email: req.body.email,
    username: username,
    password: hashedPassword
    
    // githubLink: req.body.githubLink    

    }); // creates an instance of the userModel with the request from the frontend

    await newUser.save(); // saves the user information into the database.

    // create a token for the user

    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      sameSite: "None",
      path: "/",
      secure: true,
    });

    res.status(201).json({ status: 201, message: "Registration Successful" });
  } catch (error) {
    next(error);
  }
};
exports.login = async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    // havent made the user file yet

    const user = await Users.findOne({ username });

    if (!user) {
      console.error("The username was not found");
      throw createError(401, "The username was not found");
    }

    const match = bcrypt.compare(password, user.password);

    if (!match) {
      console.log("Password does not match");
      throw res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      sameSite: "None",
      path: "/",
      secure: true,
    });

    res.json({ status: 200, message: "Login Successful" });
  } catch (error) {
    next(error);
  }
};


exports.logout = async function (req, res, next){
  try {
    res.clearCookie("token",{
      httpOnly:true,
      sameSite:"None",
      path:"/",
      secure:true,
    });
    res.json({ status:200, message:"logout Sucessful"});
  } catch (error){
    next(error);
  };
};