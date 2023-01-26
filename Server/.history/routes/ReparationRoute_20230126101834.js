var express = require('express');
var router = express.Router();
const {save,findByClient,ajoutDiagnostic,findReparation,historiqueReparation, findAllReparation,updateDiagnostic,deleteDiagnostic, findReparationByDepot} = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic);
router.get('/findRep',findReparation);
router.get('/histoRep',historiqueReparation);
router.get('/',findAllReparation);
router.get('/infodepot/:iddepot',findReparationByDepot);
router.put('/update',updateDiagnostic);
router.delete('/delete',deleteDiagnostic);


module.exports = router;
