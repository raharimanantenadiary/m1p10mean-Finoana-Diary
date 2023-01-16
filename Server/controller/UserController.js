const User = require("../models/User") ;


const findAll = async (req, res) => {
    User.find({}).then((result) => sendResult(res, result)) ;
} ;

const save = async (req, res) => {
    console.log(req.body);
    if (req.body.username === '' && req.body.mail === '' && req.body.mdp === '') {
        const error = 'compte invalide' ;
        const result = {
            error: error,
            body: req.body
        } ;
        sendResult(res, result) ;
    } else {
        await new User({username: req.body.username,mail:req.body.mail,mdp:req.body.mdp,role:{roleId:req.body.roleId,intitule:req.body.intitule},accessToken:req.body.accessToken}).save() ;
        User.find({email: req.body.mail}).then((result) => sendResult(res, result)) ;
    }
} ;

// const roleClient = async () => {
//     return Role.findOne({intitule: 'Client'}).then((result) => { return result ; }) ;
// } ;

/****************
 * SEND GENERAL *
 ***************/
function sendResult(res, result) {
    res.status(200).json(result) ;
}

/***************
 * EXPORTATION *
 **************/
module.exports = {
    findAll ,
    save 
}