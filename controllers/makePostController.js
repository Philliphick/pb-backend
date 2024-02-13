const createError = require("http-errors");
const axios = require("axios");
const Post = require("../models/project");
const mongoose = require("mongoose");

exports.makePost = async (req, res, next) => {
    try { 
        console.log("in the makePost controller")
        const { name, description, tags, repoLink, timeframe } = req.body;

        const newPost = await Post.create({ 
            _id: new mongoose.Types.ObjectId(),
            name,
            description, 
            tags, 
            repoLink, 
            timeframe });
        
        res.status(200).json({message: "Post created successfully", post: newPost});
        
    } catch (error) {
        // Handle errors
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}