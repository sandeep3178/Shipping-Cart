var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var csrf = require('csurf')
var csrfProtection = csrf();
var passport = require('passport')
router.use(csrfProtection);
require('../config/passport')
/* GET home page. */
router.get('/', async (req, res, next) => {
  await Product.find((err, doc) => {

    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < doc.length; i += chunkSize) {

      productChunks.push(doc.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });

});

router.get('/user/signup', (req, res, next) => {
  var messages = req.flash('error')
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
})
router.post('/user/signup', passport.authenticate('local-signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));
router.get('/user/profile', (req, res, next) => {
  res.render('user/profile')
})

module.exports = router;
