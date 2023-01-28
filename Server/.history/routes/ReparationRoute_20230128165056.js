var express = require('express');
var router = express.Router();

const {save,findByClient,ajoutDiagnostic,historiqueReparation,ChiffreAffaireMois, findAllReparation,updateDiagnostic,deleteDiagnostic,finirReparation, findReparationByDepot,findReparationByvoiture,findAllReparationFin ,findReparationByvoitureEtatFin} = require('../controller/ReparationController') ;
/* GET users listing. */

router.post('/save',save); //ajout reparation
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic); //ajoutDiagnostic
router.get('/',findAllReparation);
router.get('/findRep/:idreparation/:idvoiture',findReparationByvoiture);
router.get('/findRepfin/:idreparation/:idvoiture',findReparationByvoitureEtatFin);
router.get('/histoRep/all',historiqueReparation);
router.get('/infodepot/:iddepot',findReparationByDepot);
router.put('/update',updateDiagnostic);
router.delete('/delete',deleteDiagnostic);
router.post('/finir',finirReparation);
router.get('/finition/template',findAllReparationFin);
router.get('/chiffre/:mois',ChiffreAffaireMois);
              
              

//suivre avancement (idvoiture + idRepration)
//historique reparation par voiture (tout zao no mbola misy)


module.exports = router;
