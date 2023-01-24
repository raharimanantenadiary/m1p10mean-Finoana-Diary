var express = require('express');
var router = express.Router();
const {save,findByFacture,validation,findNonValide} = require('../controller/BonSortieController') ;
/* GET users listing. */

router.post('/save',save);
router.put('/validation',validation);
router.get('/byfacture',findByFacture);
router.get('/nonValide',findNonValide);

module.exports = router;
