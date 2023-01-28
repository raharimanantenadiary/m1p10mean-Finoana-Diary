var express = require('express');
var router = express.Router();

const {save,findByClient,ajoutDiagnostic,historiqueReparation, findAllReparation,updateDiagnostic,deleteDiagnostic,finirReparation, findReparationByDepot,findReparationByvoiture,findAllReparationFin } = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save); //ajout reparation
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic); //ajoutDiagnostic
router.get('/',findAllReparation);
router.get('/findRep/:idreparation/:idvoiture',findReparationByvoiture);
router.get('/histoRep',historiqueReparation);
router.get('/infodepot/:iddepot',findReparationByDepot);
router.put('/update',updateDiagnostic);
router.delete('/delete',deleteDiagnostic);
router.post('/finir',finirReparation);
router.get('/finition/template',findAllReparationFin);


module.exports = router;
