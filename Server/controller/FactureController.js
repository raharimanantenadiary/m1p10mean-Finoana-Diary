
const Facture = require("../models/Facture") ;


const findByReparation = async (req, res) => {
    await Facture.find({idreparation:req.body.id})
    .populate({path:'idreparation'})
    .exec(function (err, voiture) {
        if (err) {
            console.log(err);
        } else {
        sendResult(res, voiture);
    }
});
}

const findNonValide = async (req, res) => {
    await Facture.find({paiement:{$exists:true}})
    .populate({path:'idreparation',match:{etat:0}})
    .exec(function (err, voiture) {
        if (err) {
            console.log(err);
        } else {
        sendResult(res, voiture);
    }
});
}



const save = async (req, res) => {
    await new Facture({idreparation:req.body.id,etat:0}).save(function(error, reparation) {
        if (error) {
            console.log(error)
        } else { 
            sendResult(res,reparation);
        }
    }
    );
        

  
} ;


const paiement = async (req, res) => {
   
    Facture.findOneAndUpdate(
        { id: req.body.idfacture}, 
        { $push: { paiement: {datepaiement:req.body.date} }}, 
        { new: true },
        (err, user) => {
            if (err) return sendResult(res,err);
            sendResult(res,user);
        }
    ); 
};

const validation = async (req, res) => {
   
    Facture.updateOne({ id: req.body.idfacture},{ $set: {etat: 0} },(err,facture) => {
        if (err) return sendResult(res,err);
        sendResult(res,facture);
    })
};

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
    save,
    findByReparation,
    paiement,
    validation,
    findNonValide

}