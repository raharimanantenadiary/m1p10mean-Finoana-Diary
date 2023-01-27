
const BonSortie = require("../models/BonSortie") ;
const Reparation = require("../models/Reparation") ;


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



const findByVoiture = async (req, res) => {
    let idvoiture=mongoose.Types.ObjectId(req.params.idvoiture);
    Reparation.aggregate([
        {
          $lookup:
            {
              from: "depots",
              localField: "iddepot",
              foreignField: "_id",
              as: "depot"
            }
        },
        {
          $unwind: "$depot"
        },
        {
            $lookup:
              {
                from: "users",
                localField: "depot.idclient",
                foreignField: "_id",
                as: "user"
              }
        },
        {
            $lookup:
              {
                from: "factures",
                localField: "idfacture",
                foreignField: "_id",
                as: "facture"
              }
        },
        {
            $unwind: "$facture"
        },
    
        {
            $match: {
                $and: [
                    {"depot.idvoiture":idvoiture},
                    {"facture.etat":0},
                    {"depot.etat":2}
                ]
                
            }
        },
        
        {
            $project:
            {
            
             diagnostic:1,
             depot:1,
             user:1,
             voiture:1,
             facture:1,
              sumMont:{
                $cond: [
                    { $eq: [ "$diagnostic", [] ] },
                    0,
                    { $sum:"$diagnostic.montant" }
                ]
            },
            count:{$sum:{$size:"$diagnostic"}}
            }
        }
       
      ]) .exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
    
        }})
     
    }
    
    
    const findNonValide = async (req, res) => {
    Reparation.aggregate([
        {
          $lookup:
            {
              from: "depots",
              localField: "iddepot",
              foreignField: "_id",
              as: "depot"
            }
        },
        {
          $unwind: "$depot"
        },
        {
            $lookup:
              {
                from: "users",
                localField: "depot.idclient",
                foreignField: "_id",
                as: "user"
              }
        },
        {
            $lookup:
              {
                from: "factures",
                localField: "idfacture",
                foreignField: "_id",
                as: "facture"
              }
        },
        {
            $unwind: "$facture"
        },
    
        {
            $match: {
                $and: [
                    {"facture.etat":0},
                    {"depot.etat":2}
                ]
                
            }
        },
        
        {
            $project:
            {
             user:1,
             facture:1
            }
        }
       
      ]) .exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
    
        }})
     
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
    findByFacture,
    findByVoiture

}