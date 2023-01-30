var express = require('express');
var router = express.Router();



const {save,findByClient,ajoutDiagnostic,historiqueReparation,ChiffreAffaireMois, findAllReparation,updateDiagnostic,deleteDiagnostic,finirReparation, findReparationByDepot,findReparationByvoiture,findAllReparationFin ,findReparationByvoitureEtatFin, findAvancementByvoiture, findMoyenRep} = require('../controller/ReparationController') ;

/* GET users listing. */

router.post('/save',save); //ajout reparation
router.get('/:idclient',findByClient);
router.post('/saveDiag',ajoutDiagnostic); //ajoutDiagnostic
router.get('/',findAllReparation);
router.get('/findRep/:idreparation/:idvoiture',findReparationByvoiture);
router.get('/findRepfin/:idreparation/:idvoiture',findReparationByvoitureEtatFin);
//historique par voiture na 1 na 2 tkn mety fona jusque repration
router.get('/histoRep/:idvoiture',historiqueReparation);
router.get('/infodepot/:iddepot',findReparationByDepot);
router.put('/update',updateDiagnostic);
router.delete('/delete',deleteDiagnostic);
router.post('/finir',finirReparation);
router.get('/finition/template',findAllReparationFin);
//avancement pour une voiture voiture
router.get('/findAvancement/:idvoiture',findAvancementByvoiture);
//moyenne pour une voiture voiture // mila liste voiture niditra tao @ garage
router.get('/moyenne/voiture',findMoyenRep);

              
              

//suivre avancement (idvoiture + idRepration)
//historique reparation par voiture (tout zao no mbola misy)


module.exports = router;
