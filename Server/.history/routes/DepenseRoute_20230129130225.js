var express = require('express');
var router = express.Router();
const {save,findAll, DepenseparMois, saveTypeDep} = require('../controller/DepenseController') ;
/* GET users listing. */

router.post('/save',save);
router.post('/saveType',saveTypeDep);
router.get('/',findAll);
router.get('/total/mois/:mois',DepenseparMois);


module.exports = router;
