const Client = require("../models/Client") ;

const findAll = async (req, res) => {
    Client.find({}).then((result) => sendResult(res, result)) ;
} ;

const save = async (req, res) => {
    console.log(req.body);
    if (req.body.username === '' && req.body.email === '' && req.body.mdp === '') {
        const error = 'compte invalide' ;
        const result = {
            error: error,
            body: req.body
        } ;
        sendResult(res, result) ;
    } else {
        await new Client({username: req.body.username,mail:req.body.email,mdp:req.body.mdp}).save() ;
        Client.find({email: req.body.email}).then((result) => sendResult(res, result)) ;
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