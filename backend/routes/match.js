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
router.post("/matchs", upload.single("image"), createMatch);
router.patch("/editmatchs/:id", upload.single("image"), updateMatch);
router.delete("/matchs/:id", deleteMatch);


module.exports = router;



