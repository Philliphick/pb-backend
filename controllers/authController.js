const bcrypt = require("bcrypt");

const createError = require("http-errors");

const jwt = require("jsonwebtoken");

require('dotenv').config();

const saltRounds = 12;

const Users = require("../models/user");

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
const secretKey = process.env.SECRET_KEY;


exports.register = async function (req, res, next) {
  try {
    console.log("before register", req.body);
    const { username, email, password } = req.body; // request from frontend

    const existingUser = await Users.findOne({ username });
    const existingEmail = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
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
    name: req.body.name || "",
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    githubLink: req.body.githubLink || "no github link",

    
    
     

    }); // creates an instance of the userModel with the request from the frontend
    console.log("from register", newUser);
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
    console.log("THIS IS A LOGIN ROUTE", req.body);
    const existingUser = await Users.findOne({ username });
    console.log("user found from username and password in login", existingUser);
    console.log("before login", username, password);


    // havent made the user file yet
    

    const user = await Users.findOne({ username });

    console.log("user found", user);

    if (!user) {
      console.error("The username was not found");
      throw createError(401, "The username was not found");
    }
    // compare passwords
    const match = bcrypt.compare(password, user.password);

    if (!match) {
      console.log("Password does not match");
      throw res.status(401).json({ message: "Invalid credentials" });
    }
    // generate a token
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
    console.log("after res.cookie", res.cookie)
    // send success response
    res.json({ status: 200, message: "Login Successful", user: { username: user.username, email: user.email }    });
    console.log("after login", user);
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