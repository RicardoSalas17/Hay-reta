const router = require('express').Router();
const upload = require('../config/cloudinary')
const {
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/comment.controller");



router.get("/comment/:id", getComment);
router.post("/comments/:id", isAuth, createComment);
router.patch("/comments/:id", isAuth, updateComment);
router.delete("/comments/:id", isAuth, deleteComment);

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}


module.exports = router;


