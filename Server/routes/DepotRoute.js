var express = require('express');
var router = express.Router();
const {save,findByClient } = require('../controller/DepotController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/',findByClient);

module.exports = router;
