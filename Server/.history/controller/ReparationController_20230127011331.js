const Reparation = require("../models/Reparation") ;
const Depot = require("../models/Depot") ;
const mongoose=require("mongoose");
const Facture = require('../controller/FactureController') ;



const findReparationByDepot = async (req, res) => {
    await Reparation.findOne({iddepot: req.params.iddepot})
    .populate({path:'iddepot',match:{etat: 1}})
    .exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
    }
});
}

const findByClient = async (req, res) => {
    await Reparation.find({})
    .populate({path:'iddepot',match:{idclient:req.params.idclient,etat:1 }})
    .exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
    }
});
}

const findReparationByvoiture = async (req, res) => {
    console.log(req.params);
    let idreparation=mongoose.Types.ObjectId(req.params.idreparation);
    
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
            $match: {
                $and: [
                    {"_id":idreparation},
                    {"depot.idvoiture":idvoiture},
                    {"depot.etat":1}
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
              sumAvanc: { 
                $cond: [
                    { $eq: [ "$diagnostic", [] ] },
                    0,
                    { $divide: [ { $sum: "$diagnostic.avancement" }, { $size: "$diagnostic" } ]}
                ]
            },
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



//En cours de reparation
const findAllReparation = async (req, res) => {
    console.log(req.params);
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
                from: "voitures",
                localField: "depot.idvoiture",
                foreignField: "_id",
                as: "voiture"
              }
        },
       
       
 
        {
            $match: {
            "depot.etat":1
                  
            }
        },
        {
            $project:
            {
            
             diagnostic:1,
             depot:1,
             user:1,
             voiture:1,
              sumAvanc: { 
                $cond: [
                    { $eq: [ "$diagnostic", [] ] },
                    0,
                    { $divide: [ { $sum: "$diagnostic.avancement" }, { $size: "$diagnostic" } ]}
                ]
            },
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

//Fini:
const findAllReparationFini = async (req, res) => {
    console.log(req.params);
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
                from: "voitures",
                localField: "depot.idvoiture",
                foreignField: "_id",
                as: "voiture"
              }
        },
        {
            $match: {
            "depot.etat":1
                  
            }
        },
        {
            $project:
            {
            
             diagnostic:1,
             depot:1,
             user:1,
             voiture:1,
              sumAvanc: { 
                $cond: [
                    { $eq: [ "$diagnostic", [] ] },
                    0,
                    { $divide: [ { $sum: "$diagnostic.avancement" }, { $size: "$diagnostic" } ]}
                ]
            },
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


const historiqueReparation= async (req, res) => {
    await Reparation.find({},{diagnostic:1},{datereparation:1})
    .populate({path:'iddepot',match:{idvoiture:req.body.idvoiture,},select:'idvoiture idclient datedepot ',
    populate:{path:'idvoiture',select:'matricule marque'}})
    .exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
   
}})
};


//date debut reparation ef par defaut donc

const save = async (req, res) => {
    await new Reparation({
        // iddepot:req.body.iddepot,datereparation:req.body.date,datereparation:new Date(2023,1,23)
        iddepot:req.body.iddepot
    }).save(function(error, reparation) {
        if (error) {
            sendResult(res, error);
        } else {
            Depot.updateOne ({ _id: req.body.iddepot}, 
            { $set: {etat: 1 } }, function(err, result) {
                if (err) {
                    sendResult(res, err);
                } else {
                  console.log(result);
                }
              });
           
            sendResult(res,reparation);
        }
    }
    );  
} ;



//Transfert dans la partie finale
const finirReparation = async (req, res) => {
        Reparation.findOne({ _id:req.body.idreparation }).populate('iddepot').exec(function (err, depot) {
        if (err) sendResult(res,err);
        Depot.findOneAndUpdate({_id: depot.iddepot._id},{etat:2}, {new: true}).exec(function (err, update) {
          if (err)  sendResult(res,err);
        Facture.save(req,res)
        });

      });
};


const ajoutDiagnostic = async (req, res) => {
   
    Reparation.findOneAndUpdate(
        { _id: req.body.id}, 
        { $push: { diagnostic: {
            partie:req.body.partie,
            avancement:0,
            montant:req.body.montant,
            details:req.body.details
        } }}, // add the new role to the 'roles' array
        { new: true }, 
        (err, user) => {
            if (err) return sendResult(res,err);
            sendResult(res,user);
        }
    ); 
};

const deleteDiagnostic = async (req, res) => {
    console.log(req.body.iddiag);
     Reparation.updateOne(
         { _id: req.body.idreparation}, 
         { $pull: { diagnostic: {
             _id:req.body.iddiag
         } }},
         (err, user) => {
             if (err) return sendResult(res,err);
             sendResult(res,user);
         }
     ); 
 };
 
 const updateDiagnostic = async (req, res) => {
    
     Reparation.findOneAndUpdate(
         { _id: req.body.idreparation, "diagnostic._id": req.body.iddiag },
         { $set: { "diagnostic.$.avancement": req.body.avancement } },
         { new: true },
         (err, doc) => {
             if (err) {
                 sendResult(res,err);
             } else {
                 sendResult(res,doc);
             }
         }
     );
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
    findByClient ,
    save,
    ajoutDiagnostic,
    historiqueReparation,
    findAllReparation,
    findReparationByDepot,
    deleteDiagnostic,
    updateDiagnostic,
    findReparationByvoiture,
    finirReparation,
    findAllReparationFini
}