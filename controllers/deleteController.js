const createError = require("http-errors");
const axios = require("axios");
const Post = require("../models/project");
const Users = require("../models/user"); //NOT AVAILABLE YET

exports.deletePost = async (req, res, next) => {
    const { id, username } = req.params;
    try {
        await Post.findOneAndUpdate(
          { token: username }, //we don't have token yet
          { $pull: { Post: { _id : id } } },
          { safe: true, multi: false }
        );
        res.send("Post deleted successfully");
    } catch (err) {
        return next(createError(500, err.message));
    }
}
