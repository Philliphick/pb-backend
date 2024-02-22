const express = require('express');
const router = express.Router(); // Create a router instance


const { authUser } = require("../middleware/auth");

// IMPORT POST ROUTES
const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");
const { deletePost } = require("../controllers/deleteController");
const { makePost } = require("../controllers/makePostController");
const { getCurrentUser } = require("../controllers/getCurrentUser");
const { getAllUsers } = require("../controllers/getAllUsers");
const { getUserById } = require("../controllers/getUserById");

//IMPORT USER ROUTES
const { makeUser } = require("../controllers/makeUserController");


router.post("/newUser", makeUser);
router.get("/getprofile", authUser, getCurrentUser);
router.get("/getUserById/:id", getUserById);


router.get("/allusers", getAllUsers);


// POST ROUTES
router.delete("/delete/:_id", authUser, deletePost);
router.post("/makePost", authUser, makePost)
router.get("/:nameParam", authUser, getProjects);




router.get("/", getAllProjects);


// when a client req is made to /project/:nameParam it will be sent here, for example




module.exports = router;








