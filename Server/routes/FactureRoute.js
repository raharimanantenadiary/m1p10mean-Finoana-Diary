var express = require('express');
var router = express.Router();
const {save,findByReparation,paiement,validation,findNonValide, findByVoiture,ChiffreAffaireMois, beneficeMois} = require('../controller/FactureController') ;
/* GET users listing. */

router.post('/save',save);
router.put('/paiement',paiement);
router.put('/validation',validation);
router.get('/byreparation',findByReparation);
router.get('/nonValide',findNonValide);
// router.get('/',findByClient);
router.post('/validerFacture',validation);
router.get('/chiffre/:mois',ChiffreAffaireMois);
router.get('/benefice/:mois',beneficeMois);
router.get('/byvoiture/:idvoiture',findByVoiture);

// router.get('/findRep',findReparation);

module.exports = router;
