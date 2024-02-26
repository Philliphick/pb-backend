// fetch user by ID for the project card - so we can link the users profile to the project card
const createError = require("http-errors");
const axios = require("axios");
const User = require("../models/user");

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log("Fetching user with name:", id);
        const user = await User.find({ _id: id });

        console.log("User found:", user);
        if (!user) {
            return next(createError(404, "user not found"));
        }


        res.status(200).json(user);
        console.log("User found:", user);

    } catch (err) {
        next(err);
    }
}






