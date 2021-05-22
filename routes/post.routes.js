
const { Router } = require('express');
const router = new Router();
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const uploader = require('../configs/cloudinary.config');


router.get('/postForm', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login')
    return
  }
  res.render('post/new');
});

router.post('/postForm', uploader.single('image'), (req, res, next) => {
  //const { content, creatorId, picName } = req.body;
  //const picPath = req.file.path
  if (!req.session.currentUser) {
    return next(new Error('merci de vous logger'))
  }
  Post.create({
    content: req.body.content,
    creatorId: req.session.currentUser.id,
    picPath: req.file.path,
    picName: req.file.originalname
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(`Error while creating a new pic: ${error}`));
});

module.exports = router;