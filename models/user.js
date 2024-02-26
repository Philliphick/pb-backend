const mongoose = require("mongoose"); 

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    username: String,
    password: String,
    githubLink: String,
    telegramUsername: String
    
})
module.exports = mongoose.model("User", userSchema);
