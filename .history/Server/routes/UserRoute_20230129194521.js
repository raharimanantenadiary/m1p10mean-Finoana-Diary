var express = require('express');
var router = express.Router();
// const {authenticateToken } = require('../Middleware/token') ;

const { findAll, save , supprimerVoiture, getUserInfo } = require('../controller/UserController') ;
/* GET users listing. */

router.get('/',findAll );
router.put('/userInfo',getUserInfo );
router.post('/save',save);
router.put('/supprimerVoiture/:clientid/:voitureid',supprimerVoiture);

module.exports = router;
