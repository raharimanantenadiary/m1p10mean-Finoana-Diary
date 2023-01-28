var express = require('express');
var router = express.Router();
const {save,findByReparation,paiement,validation,findNonValide} = require('../controller/FactureController') ;
/* GET users listing. */

router.post('/save',save);
router.put('/paiement',paiement);
router.put('/validation',validation);
router.get('/byreparation',findByReparation);
router.get('/nonValide',findNonValide);
// router.get('/',findByClient);
// router.post('/saveDiag',ajoutDiagnostic);
// router.get('/findRep',findReparation);

module.exports = router;