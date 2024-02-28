// jwt auth 

const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/auth");
const { login, logout, register } = require("../controllers/authController");


router.post("/login", login);
router.post("/registration", register);
router.post("/logout", authUser, logout); //authUser here?

// when a client req is made to /auth/login or /auth/register or /auth/logout it will be sent here

module.exports = router