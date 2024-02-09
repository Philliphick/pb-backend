// controller to fetch data for the entire full project card
const createError = require("http-errors");
const axios = require("axios");
const  Post  = require("../models/project");

exports.getProjects = async (req, res, next) => {
    try { 
        const { id } = req.params;
        
        console.log("Fetching projects with name:", id);
        const projects = await Post.find({ _id: id });
        
        console.log("Projects found:", projects);
        if (!projects) {
            return next(createError(404, "Project not found"));
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


    // use the below logic with router.get("/:id", getProjects); when we have set up id assignment through the make a project (
    // on creation of the project the id will be assigned automatically)

// exports.getProjects = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const projects = await Projects.findById(id);
//         if (!projects) {
//             return next(createError(404, "Project not found"));
//         }
        
//     }
// }

