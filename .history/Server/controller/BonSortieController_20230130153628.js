
const BonSortie = require("../models/BonSortie") ;
const Reparation = require("../models/Reparation") ;
const mongoose=require("mongoose");

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

const verifieBS= async (req, res) => {
    let idvoiture=mongoose.Types.ObjectId(req.body.idvoiture);
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
            $match: {
                $and: [
                    {"depot.idvoiture":idvoiture},
                    {
                        
                        $or: [
                            {"depot.etat":1},
                            {"depot.etat":2}
                        ]
                    }
                  
                ]
                
            }
        },
        {
            $lookup:
            {
                from: "bonsorties",
                localField: "idbonsortie",
                foreignField: "_id",
                as: "bonsortie"
            }
        },
        {
            $unwind: "$bonsortie"
        },
    
        
        {
            $project:
            {
             depot:1,
             bonsortie:1
            }
        }
       
      ]) .exec(function (err, reparation) {
        if (err) {
           return  sendResult(res, err);
        } else {
            if(reparation.length>0)
            {
                console.log(reparation);
                if(reparation[0].bonsortie.etatLivraison==1)
                {
                 return sendResult(res, reparation[0]);

                }
            }
            return sendResult(res,   reparation[0]);
    
        }})
     
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
    save,
    validation,
    findNonValide,
    findByFacture,
    verifieBS

}

