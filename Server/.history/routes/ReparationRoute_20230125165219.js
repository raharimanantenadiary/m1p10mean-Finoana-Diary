var express = require('express');
var router = express.Router();
const {save,findByClient,ajoutDiagnostic,findReparation,historiqueReparation, findAllReparation} = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic);
router.get('/findRep',findReparation);
router.get('/histoRep',historiqueReparation);
router.get('/findAllRep',findAllReparation);


module.exports = router;
