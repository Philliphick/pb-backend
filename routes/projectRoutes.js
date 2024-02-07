const express = require("express")
const router = express.Router();


const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");
const { deleteProject } = require("../controllers/deleteController");

router.get("/:nameParam", getProjects);
router.get("/", getAllProjects);

router.delete("/:id", deleteProject);

module.exports = router;
