const Voiture = require("../models/Voiture") ;
const User = require("../models/User") ;


const findAll = async (req, res) => {
    console.log(req.params);
    User.findOne({_id:req.params.idclient},{voiture:1}).populate({path:'voiture.id',match:{etat:0}})
    .exec(function (err, facture) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, facture);
    }
});
}


const findAllWhereEtatVoitureGaraga = async (req, res) => {
    console.log(req.params);
    User.findOne({_id:req.params.idclient},{voiture:1}).populate({path:'voiture.id',match:{etat:1}})
    .exec(function (err, facture) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, facture);
    }
});
}

const save = async (req, res) => {
    console.log(req.body);
    const voiture = new Voiture({
        marque: req.body.marque,
        designation:req.body.designation,
        matricule:req.body.matricule,
        etat:0//ts anaty garage
       
    });

    
    voiture.save(function(error, voiture) {
        if (error) {
            sendResult(res,error);
        } else {
            User.findOneAndUpdate(
                { _id: req.body.idclient}, // find the client by email
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






const recuperation = async (req, res) => {
    Voiture.updateOne ({ _id: req.body.idvoiture}, 
        { $set: {etat: 0 } }, function(err, result) {
            if (err) {
                sendResult(res, err);
            } else {
              console.log(result);
            }
          });
       
}





  



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
    recuperation,
    findAllWhereEtatVoitureGaraga
}