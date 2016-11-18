const express = require('express');
const router = express.Router();
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.get('/', function (req, res, next) {
  Secret.findAll({})
  .then(secrets => {
    res.render('index', {
      secrets: secrets
    });
  })
  .catch(next);
});

router.get('/add', function (req, res, next) {
  res.render('add');
});

router.get('/:secretId', function (req, res, next) {});

router.post('/', function (req, res, next) {
  Secret.create({
    text: req.body.text
  })
  .then(secret => {
    // question about redirect here
    res.redirect('/');
  })
  .catch(next);
});

router.use('/:secretId/comments', require('./comments-subrouter'));