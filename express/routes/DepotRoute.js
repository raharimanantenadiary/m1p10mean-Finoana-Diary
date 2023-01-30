var express = require('express');
var router = express.Router();
const {save,findAll } = require('../controller/DepotController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/',findAll);

module.exports = router;
