const createError = require("http-errors");
const axios = require("axios");
const  User  = require("../models/user");
const mongoose = require("mongoose");


exports.getCurrentUser = async (req, res, next) => {
    try {
       
        console.log('Received user ID:', req.decodedToken.userId);
        const user = await User.findById(req.decodedToken.userId);
        console.log("user:", user)
        if (!user) {
            return next(createError(404, "User not found"));
        }
        if (
            req.decodedToken.userId !== user._id.toString() 
        ) {
            return next(createError(403, "Unauthorized access"));
        } else {
            res.status(200).json({
                data: user
            })
            
        };

    } catch (err) {
        next(err);
    }
}
