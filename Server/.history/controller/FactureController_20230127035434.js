
const Facture = require("../models/Facture") ;
const Reparation = require("../models/Reparation") ;
const BonSortie = require("../controller/BonSortieController") ;
const mongoose=require('mongoose');


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
               facture:1,
              sumMont:{
                $cond: [
                    { $eq: [ "$diagnostic", [] ] },
                    0,
                    { $sum:"$diagnostic.montant" }
                ]
            }
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
    await new Facture({idreparation:req.body.idreparation,etat:0}).save(function(error,facture) {
        if (error) {
            sendResult(res,error);
        } else { 
        Reparation.findOneAndUpdate(
        { _id: req.body.idreparation}, 
        { $set: { idfacture: facture._id} },
        { new: true },
        ).exec(function (err, update) {
        if (error) sendResult(res,err);
        sendResult(res,update);
        });

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

const validation = async (req, res,next) => {
    Facture.updateOne({ _id: req.body.idfacture},{ $set: {etat: 1} },(err,facture) => {
        if (err) return sendResult(res,err);
        Reparation.findOne({idfacture:req.body.idfacture}).exec(function (err, reparation) {
        console.log(reparation);
        req.idreparation=reparation._id;
        BonSortie.save(req,res);
    });
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
    findNonValide,
    findByVoiture

}