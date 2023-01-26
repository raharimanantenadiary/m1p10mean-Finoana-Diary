const Reparation = require("../models/Reparation") ;
const Depot = require("../models/Depot") ;
const mongoose=require("mongoose");





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
          $group:
            {
              _id:"$_id",
              data:{ $first: "$$ROOT" },
              sumAvanc: { $sum: { $sum: "$diagnostic.avancement"} },
              sumMont: { $sum: { $sum: "$diagnostic.montant"} },
              count:{$sum:{$size:"$diagnostic"}},
        
      
          
            }
        },
        { 
            $project:
            { 
            _id:"$_id",
            data:1,
            totalAv: {$divide: ["$sumAvanc", "$count"]},
            totalMont: {$divide: ["$sumMont", "$count"]},
            }
        }
      ]) .exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
    
        }})
     

}



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
            $match: {
                $and: [
                    {"depot.etat":1}
                ]
                
            }
        },
        {
          $group:
            {
              _id:"$_id",
              data:{ $first: "$$ROOT" },
              sumAvanc: { $sum: { $sum: "$diagnostic.avancement"} },
              sumMont: { $sum: { $sum: "$diagnostic.montant"} },
              count:{$sum:{$size:"$diagnostic"}},
        
      
          
            }
        },
        { 
            $project:
            { 
            _id:"$_id",
            data:1,
            totalAv: {$divide: ["$sumAvanc", "$count"]},
            totalMont: {$divide: ["$sumMont", "$count"]},
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
   
    Reparation.updateOne(
        { _id: req.body.id}, 
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
   
    Reparation.updateOne(
        { _id: req.body.id}, 
        { $set: { diagnostic: {
            _id:req.body.iddiag
        } }},
        (err, user) => {
            if (err) return sendResult(res,err);
            sendResult(res,user);
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
    findReparationByvoiture
}