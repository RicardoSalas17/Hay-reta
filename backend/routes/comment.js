const router = require('express').Router();
const upload = require('../config/cloudinary')
const {
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/comment.controller");



router.get("/comment/:id", getComment);
router.post("/comments/:id", createComment);
router.patch("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);


module.exports = router;



