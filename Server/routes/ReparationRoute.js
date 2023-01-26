var express = require('express');
var router = express.Router();
const {save,findByClient,ajoutDiagnostic,historiqueReparation, findAllReparation,updateDiagnostic,deleteDiagnostic, findReparationByDepot,findReparationByvoiture,finirReparation} = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save);
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic);
router.get('/',findAllReparation);
router.get('/findRep/:idreparation/:idvoiture',findReparationByvoiture);
router.get('/histoRep',historiqueReparation);
router.get('/infodepot/:iddepot',findReparationByDepot);
router.put('/update',updateDiagnostic);
router.delete('/delete',deleteDiagnostic);
router.post('/finition',finirReparation);


module.exports = router;
