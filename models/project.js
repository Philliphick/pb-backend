const mongoose = require("mongoose"); 

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    subheading: String,
    description: String,
    tags: Array,
    repoLink: String,
    userId: String
})
module.exports = mongoose.model("Post", projectSchema);
