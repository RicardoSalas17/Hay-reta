const router = require('express').Router();
const upload = require('../config/cloudinary')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

router.post('/upload', upload.single('photo'), (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.status(201).json({ file: req.file, data: { ...req.body } })
})


module.exports = router;


