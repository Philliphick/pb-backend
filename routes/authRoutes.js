// jwt auth 

// const jwt = require("jsonwebtoken");
// const login = (req, res) => {
//   const { email, password } = req.body;
//   const token = jwt.sign(
//     {
//       email,
//       password,
//     },
//     "secret"
//   );
//     res.cookie("token", token, { httpOnly: true });
// };

const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/auth");
const { login, logout, register } = require("../controllers/authController");


router.post("/login", login);
router.post("/registration", register);
router.post("/logout", authUser, logout); //authUser here?

// when a client req is made to /auth/login or /auth/register or /auth/logout it will be sent here

module.exports = router