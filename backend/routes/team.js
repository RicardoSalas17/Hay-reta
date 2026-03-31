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
router.post("/teams", isAuth, upload.single("image"), createTeam);
router.patch('/editteam/:id', isAuth, upload.single("image"), updateTeam);
router.delete("/team/:id", isAuth, deleteTeam);

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}


module.exports = router;


