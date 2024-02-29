const createError = require("http-errors");
const axios = require("axios");
const  Post  = require("../models/project");

exports.getAllProjects = async (req, res, next) => {

    try {
        console.log("Fetching all projects");
        const projects = await Post.find();
        console.log(projects)
        res.status(200).json({
            
            data: projects
        });
    } catch(err) {
        next(err);
    }
    
}
