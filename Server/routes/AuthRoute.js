var express = require('express');
var router = express.Router();
const { signin, signup } = require('../controller/AuthController') ;
/* GET users listing. */
router.get('/signin',signin );
router.post('/signup',signup);

module.exports = router;
