
const BonSortie = require("../models/BonSortie") ;
const Facture = require("../controller/FactureController") ;


const findByFacture = async (req, res) => {
    await BonSortie.find({idFacture:req.body.idfacture})
    .populate({path:'idFacture'})
    .exec(function (err, bonsortie) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, bonsortie);
    }
});
}

const findNonValide = async (req, res) => {
    await BonSortie.find({etatLivraison:0})
    .populate({path:'idFacture',match:{etatLivraison:0}})
    .exec(function (err, bonsortie) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, bonsortie);
    }
});
}



const save = async (req, res) => {
    await new Facture({idFacture:req.body.idfacture,etatLivraison:0,dateSortie:req.body.date}).save(function(error,bonsortie) {
        if (error) {
            sendResult(res,error);
        } else { 
            sendResult(res,bonsortie);
        }
    }
    );
        

  
} ;


const validation = async (req, res) => {
   
    BonSortie.updateOne({ _id: req.body.idBonSortie},{ $set: {etatLivraison: 1} },(err,bonsortie) => {
        if (err) return sendResult(res,err);
        sendResult(res,bonsortie);
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
    validation,
    findNonValide,
    findByFacture

}