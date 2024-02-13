const express = require("express")
const router = express.Router();

const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");

const { makeUser } = require("../controllers/makeUserController");
const { deletePost } = require("../controllers/deletePostController");

const { makePost } = require("../controllers/makePostController")

router.get("/:nameParam", getProjects);
router.get("/", getAllProjects);
router.post("/newUser", makeUser);

router.post("/makePost", makePost);

router.delete("/delete/:_id", deletePost);

module.exports = router;
