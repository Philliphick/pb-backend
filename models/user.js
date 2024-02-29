const mongoose = require("mongoose"); 

const userSchema = mongoose.Schema({
    
    name: String,
    email: String,
    username: String,
    password: String,
    githubLink: String,
    telegramUsername: String,
    twitter: String,
    location: String,
    
})
module.exports = mongoose.model("User", userSchema);
