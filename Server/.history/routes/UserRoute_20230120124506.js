var express = require('express');
var cors = require('cors');
var router = express.Router();


const { findAll, save } = require('../controller/UserController') ;
/* GET users listing. */
router.get('/',findAll );
router.post('/save',save);

module.exports = router;
