const router = require('express').Router();
const upload = require('../config/cloudinary')
const {
  getMatchs,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch
} = require("../controllers/match.controller");



router.get("/matchs", getMatchs);
router.get("/matchs/:id", getMatch);
router.post("/matchs", isAuth, upload.single("image"), createMatch);
router.patch("/editmatchs/:id", isAuth, upload.single("image"), updateMatch);
router.delete("/matchs/:id", isAuth, deleteMatch);

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}


module.exports = router;


