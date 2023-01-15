var express = require('express');
var router = express.Router();
const { signin, signup } = require('../controller/AuthController') ;
/* GET users listing. */
router.get('/signup',signin );
router.post('/signin',signup);

module.exports = router;
