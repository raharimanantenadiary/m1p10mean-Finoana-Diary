var express = require('express');
var router = express.Router();
const { signin, signup,envoyecode,activation } = require('../controller/AuthController') ;
/* GET users listing. */
router.get('/signin',signin );
router.post('/signup',signup);
router.get('/envoyecode',envoyecode);
router.get('/activation',activation);

module.exports = router;
