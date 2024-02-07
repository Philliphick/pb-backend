const mongoose = require("mongoose"); 

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    tags: Array,
    repoLink: String,
    timeframe: Number
})
module.exports = mongoose.model("Post", projectSchema);
