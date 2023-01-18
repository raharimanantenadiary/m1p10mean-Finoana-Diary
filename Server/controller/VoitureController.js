const Voiture = require("../models/Voiture") ;
const User = require("../models/User") ;


const findAll = async (req, res) => {
    Voiture.find({}).then((result) => sendResult(res, result)) ;
} ;

const save = async (req, res) => {
    console.log(req.body);
    const voiture = new Voiture({
        marque: req.body.marque,
        designation:req.body.designation,
        matricule:req.body.matricule
       
    });
    
    voiture.save(function(error, voiture) {
        if (error) {
            console.log(error)
        } else {
            User.findOneAndUpdate(
                { mail: req.body.mail}, // find the client by email
                { $push: { voiture: {id:voiture.id} }}, // add the new role to the 'roles' array
                { new: true }, // return the updated document
                (err, user) => {
                    if (err) return handleError(err);
                    sendResult(res,user);
                }
            );
        }
    });

       
    }

  


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