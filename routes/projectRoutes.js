const express = require('express');
const router = express.Router(); // Create a router instance


const { authUser } = require("../middleware/auth");

// IMPORT POST ROUTES
const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");
const { deletePost } = require("../controllers/deleteController");
const { makePost } = require("../controllers/makePostController");
const { getUser } = require("../controllers/getUser");

//IMPORT USER ROUTES
const { makeUser } = require("../controllers/makeUserController");


router.post("/newUser", makeUser);
router.get("/user/:id", getUser);


// POST ROUTES
router.delete("/delete/:_id", authUser, deletePost);
router.post("/makePost", authUser, makePost)
router.get("/:nameParam", authUser, getProjects);



router.get("/", getAllProjects);

// when a client req is made to /project/:nameParam it will be sent here, for example




module.exports = router;








