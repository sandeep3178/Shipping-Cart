var express = require('express');
var router = express.Router();
var Product = require('../models/product')
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

module.exports = router;
