const createError = require("http-errors");
const axios = require("axios");
const  User  = require("../models/user");
const mongoose = require("mongoose");


exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('Received user ID:', id);
        const user = await User.findById(id);
        if (!user) {
            return next(createError(404, "User not found"));
        }

        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}
