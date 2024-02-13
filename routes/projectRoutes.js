const express = require("express")
const router = express.Router();

// IMPORT POST ROUTES
const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");
const { deletePost } = require("../controllers/deleteController");
const { makePost } = require("../controllers/makePostController");

//IMPORT USER ROUTES
const { makeUser } = require("../controllers/makeUserController");

// USER ROUTES
router.post("/newUser", makeUser);

// POST ROUTES
router.delete("/delete/:_id", deletePost);
router.post("/makePost", makePost)
router.get("/:nameParam", getProjects);
router.get("/", getAllProjects);


module.exports = router;
