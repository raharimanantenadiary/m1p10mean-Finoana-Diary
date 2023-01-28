var express = require('express');
var router = express.Router();
const {save,findByReparation,paiement,validation,findNonValide, findByVoiture,ChiffreAffaireJour,ChiffreAffaireMois} = require('../controller/FactureController') ;
/* GET users listing. */

router.post('/save',save);
router.put('/paiement',paiement);
router.put('/validation',validation);
router.get('/byreparation',findByReparation);
router.get('/nonValide',findNonValide);
// router.get('/',findByClient);
router.post('/validerFacture',validation);
router.get('/ChiffreJour/:date',ChiffreAffaireJour);
router.get('/ChiffreMois/:mois',ChiffreAffaireMois);
router.get('/byvoiture/:idvoiture',findByVoiture);

// router.get('/findRep',findReparation);

module.exports = router;
