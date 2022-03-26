const express = require('express');
const router = express.Router();
const user = require('./user');
const poke = require('./poke');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
  });
});

router.use('/api/user', user);
router.use('/api/poke', poke);

module.exports = router;