const express = require('express');
const router = express.Router();
const { getLogin, getSignUp, userReg, userLogin, getHome } = require('../controller/users.controller.js');

router.get('/login', getLogin);
router.get('/signup', getSignUp);
router.post('/signup', userReg);
router.post('/login', userLogin);
router.get('/home', getHome);

module.exports = router;
