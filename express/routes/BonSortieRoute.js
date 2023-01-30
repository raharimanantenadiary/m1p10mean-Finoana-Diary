var express = require('express');
var router = express.Router();
const {save,findByFacture,validation,findNonValide, verifieBS} = require('../controller/BonSortieController') ;
/* GET users listing. */

router.post('/save',save);
router.put('/validation',validation);
router.put('/verifieBS',verifieBS);
router.get('/byfacture',findByFacture);
router.get('/nonValide',findNonValide);

module.exports = router;
