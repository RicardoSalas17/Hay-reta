const router = require('express').Router();
const upload = require('../config/cloudinary')
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
} = require("../controllers/team.controller");


// Projects
router.get("/teams", getTeams);
router.get("/team/:id", getTeam);
router.post("/teams/:id", createTeam);
router.patch("/teams/:id", updateTeam);
router.delete("/teams/:id", deleteTeam);


module.exports = router;



