const createError = require("http-errors");
const axios = require("axios");
const  User  = require("../models/user");


exports.getAllUsers = async (req, res, next) => {

    try {
        const allUsers = await User.find();
        console.log(projects)
        res.status(200).json({
            data: allUsers
        });
    } catch(err) {
        next(err);
    }
    
}