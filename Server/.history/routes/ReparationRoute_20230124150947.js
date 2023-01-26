var express = require('express');
var router = express.Router();
const {save,findByClient,ajoutDiagnostic,findReparation,historiqueReparation} = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic);
router.get('/findRep',findReparation);
router.get('/histoRep',historiqueReparation);


module.exports = router;