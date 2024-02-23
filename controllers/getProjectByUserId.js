// controller to fetch posts that belong to a user, search by userID
const createError = require("http-errors");
const axios = require("axios");
const  Post  = require("../models/project");

exports.getProjectByUserId = async (req, res, next) => {
    try { 
        console.log('Received user ID FROM GET PROJECT BY USER ID:', req.decodedToken.userId);
        const userId = req.decodedToken.userId;
        const projects = await Post.find({ userId: userId });
        
        console.log("Projects BY USER ID found:", projects);
        if (!projects) {
            return next(createError(404, "No Projects Found"));
        }
        // const foundProject = projects[0];
        // console.log("Found project:", foundProject);

        res.status(200).json(projects);
        console.log("Projects found:", projects);
        
    } 

    
    catch(err) {
        next(err);
    }
}


  

