const createError = require("http-errors");
const axios = require("axios");
const  Post  = require("../models/project");

exports.getAllProjects = async (req, res, next) => {

    try {
        const projects = await Post.find();
        res.status(200).json({
            count: projects.length,
            data: projects
        });;
    } catch(err) {
        next(err);
    }
    
}
