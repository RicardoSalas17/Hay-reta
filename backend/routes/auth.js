const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const upload = require('../config/cloudinary')
const {
  createUser,
  editUser,
  getUser
} = require("../controllers/auth.controller");

router.post('/signup',upload.single("image"),createUser);

router.patch('/editprofile/:id',upload.single("image"),editUser);

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});


router.get('/profile', getUser)



function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}



module.exports = router;
