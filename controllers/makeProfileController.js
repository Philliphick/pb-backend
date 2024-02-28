const createError = require("http-errors");
const axios = require("axios");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.makeProfile = async (req, res, next) => {
  try {
    console.log("in the makeProfile controller")
    const { id } = req.params;  
    const { name, email, githubLink, telegram, twitter, location, photo } = req.body;  // get the new profile data from the request body

    
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    
    user.name = name;
    user.email = email;
    user.githubLink = githubLink;
    user.telegram = telegram;
    user.twitter = twitter;
    user.location = location;
    user.photo = photo;

    const updatedUser = await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    // Handle errors
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};