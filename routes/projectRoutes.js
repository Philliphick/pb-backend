const express = require("express")
const router = express.Router();


const { getProjects } = require("../controllers/getController");
const { getAllProjects } = require("../controllers/getAllController");


router.get("/:nameParam", getProjects);
router.get("/", getAllProjects);


module.exports = router;
