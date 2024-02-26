const createError = require("http-errors");
const Post = require("../models/project");


exports.deletePost = async (req, res, next) => {
    const { _id } = req.params; // Changed from reqId to _id

    try {
        const result = await Post.findOneAndDelete({ _id: _id });
        if (!result) {
            return res.status(404).send("Post with the given ID does not exist");
        }
        res.send("Post deleted successfully - this time from the controller!");
    } catch (err) {
        return next(createError(500, err.message));
    }
}
