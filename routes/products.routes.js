const express = require('express');

const router = express.Router();
const { getProduct, getSelling, postSelling, getProductById } = require('../controller/products.controller.js');


router.get('/search' , getProduct);
router.get('/sell',getSelling);
router.post('/sell',postSelling);
router.get('/product/:id',getProductById);

module.exports = router;