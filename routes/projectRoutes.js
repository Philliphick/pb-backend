const express = require("express")
const router = express.Router();


const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");

const { makeUser } = require("../controllers/makeUserController");
// const { deleteProject } = require("../controllers/deleteController");


router.get("/:nameParam", getProjects);
router.get("/", getAllProjects);
router.post("/newUser", makeUser);

// router.delete("/:id", deleteProject);

module.exports = router;
