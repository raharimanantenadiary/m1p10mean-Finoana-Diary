const User = require("../models/User") ;


const findAll = async (req, res) => {
    User.find({}).then((result) => sendResult(res, result)) ;
} ;


//tsy mandeha (mampalahelo za,mba nanadrana)
const supprimerVoiture = async (req, res) => {
    User.updateOne(
    { _id: req.params.clientid },
    { $pull: { voiture: { _id: req.params.voitureid } } })
    .then(() => res.json({ message: 'voiture supprimée avec succes' }))
    .catch(err => res.status(500).json({ message: 'une erreur est survenue' }));
}

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
        await new User({username: req.body.username,mail:req.body.mail,mdp:req.body.mdp,role:{roleId:req.body.roleId}}).save() ;
        User.find({email: req.body.mail}).then((result) => sendResult(res, result)) ;
    }

  
} ;



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
    save ,
    supprimerVoiture
}