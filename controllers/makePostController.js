const createError = require("http-errors");
const axios = require("axios");
const Post = require("../models/project");
const mongoose = require("mongoose");

exports.makePost = async (req, res, next) => {
    try { 
        console.log("in the makePost controller")
        const { name, subheading, description, tags, repoLink } = req.body;
// added logic to collect the userId from the decoded token
        const userId = req.decodedToken.userId;

        const newPost = await Post.create({ 
            _id: new mongoose.Types.ObjectId(),
            name,
            subheading, 
            description, 
            tags, 
            repoLink, 
            userId: userId //the users ID is now attached to every post they make
         });
        
        res.status(200).json({message: "Post created successfully", post: newPost});

        
        
    } catch (error) {
        // Handle errors
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}