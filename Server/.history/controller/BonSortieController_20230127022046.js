
const BonSortie = require("../models/BonSortie") ;


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
    console.log(req.idreparation);
    await new BonSortie({etatLivraison:0,dateSortie:new Date()}).save(function(error,bonsortie) {
        if (error) {
            sendResult(res,error);
        } else { 
            Reparation.findOneAndUpdate(
                { _id: req.idreparation}, 
                { $set: { idbonsortie: bonsortie._id} },
                { new: true },
                ).exec(function (err, update) {
                if (error) sendResult(res,err);
                sendResult(res,update);
                });
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