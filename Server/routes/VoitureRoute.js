var express = require('express');
var router = express.Router();
const {  save,findAll,recuperation ,findAllWhereEtatVoitureGaraga} = require('../controller/VoitureController') ;
const { find } = require('../models/User');
/* GET users listing. */

router.post('/save',save);
router.get('/byclient/:idclient',findAll);
router.get('/byclient/garage/:idclient',findAllWhereEtatVoitureGaraga);
router.put('/recuperation',recuperation);

module.exports = router;
