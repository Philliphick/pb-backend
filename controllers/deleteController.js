const createError = require("http-errors");
const Post = require("../models/project");


exports.deletePost = async (req, res, next) => {
    console.log("inside the delete controller")
    const { _id } = req.params; // Changed from reqId to _id
console.log("the id", _id)
    try {
        // const foundpost = await Post.findOne({ _id: _id });
        // if (!foundpost) {
        //     return res.status(404).send("Post with the given ID does not exist");
        // } else {
        //     console.log("found post", foundpost)
        // }
        const foundpost = await Post.findOne({ _id: _id });
        console.log(foundpost)
        const result = await Post.findOneAndDelete({ _id: _id });
        if (!result) {
            return res.status(404).send("Post with the given ID does not exist");
        } 


        res.send("Post deleted successfully - this time from the controller!");
    } catch (err) {
        return next(createError(500, err.message));
    }
}
