
const Facture = require("../models/Facture") ;


const findByReparation = async (req, res) => {
    await Facture.find({idreparation:req.body.id})
    .populate({path:'idreparation'})
    .exec(function (err, facture) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, facture);
    }
});
}

const findNonValide = async (req, res) => {
    await Facture.find({paiement:{$exists:true},etat:0})
    .populate({path:'idreparation',match:{etat:0}})
    .exec(function (err, facture) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, facture);
    }
});
}



const save = async (req, res) => {
    await new Facture({idreparation:req.body.id,etat:0}).save(function(error,facture) {
        if (error) {
            sendResult(res,error);
        } else { 
            sendResult(res,facture);
        }
    }
    );
        

  
} ;


const paiement = async (req, res) => {
   
    Facture.findOneAndUpdate(
        { _id: req.body.idfacture}, 
        { $push: { paiement: {datepaiement:req.body.date} }}, 
        { new: true },
        (err, user) => {
            if (err) return sendResult(res,err);
            sendResult(res,user);
        }
    ); 
};

const validation = async (req, res) => {
   
    Facture.updateOne({ _id: req.body.idfacture},{ $set: {etat: 1} },(err,facture) => {
        if (err) return sendResult(res,err);
        sendResult(res,facture);
    })
};


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