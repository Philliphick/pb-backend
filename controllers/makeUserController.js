const createError = require("http-errors");
const axios = require("axios");
const  User  = require("../models/user");
const mongoose = require("mongoose");

exports.makeUser = async (req, res, next) => {
    try { 
        const { name, email, userName, password, githubLink } = req.body;

        const newUser = await User.create({ 
            _id: new mongoose.Types.ObjectId(),
            name,
            email, 
            userName, 
            password, 
            githubLink });
        
        res.status(200).json({message: "User created successfully", user: newUser});
        
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}