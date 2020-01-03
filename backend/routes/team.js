const router = require('express').Router();
const upload = require('../config/cloudinary')
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
} = require("../controllers/team.controller");



router.get("/teams", getTeams);
router.get("/team/:id", getTeam);
router.post("/teams",upload.single("image"), createTeam);
router.patch("/teams/:id", updateTeam);
router.delete("/teams/:id", deleteTeam);


module.exports = router;



