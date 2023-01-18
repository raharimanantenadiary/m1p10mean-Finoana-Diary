var express = require('express');
var router = express.Router();
const {save,findByClient,ajoutDiagnostic,findReparation} = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/',findByClient);
router.post('/saveDiag',ajoutDiagnostic);
router.get('/findRep',findReparation);

module.exports = router;
