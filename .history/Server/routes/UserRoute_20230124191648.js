var express = require('express');
var router = express.Router();
// const {authenticateToken } = require('../Middleware/token') ;

const { findAll, save , supprimerVoiture } = require('../controller/UserController') ;
/* GET users listing. */

router.get('/',findAll );
router.post('/save',save);
router.put('/supprimerVoiture/:clientid/:voitureid',supprimerVoiture);

module.exports = router;
