const Voiture = require("../models/Voiture") ;
const User = require("../models/User") ;
const mongoose=require("mongoose");
const Reparation = require("../models/Reparation") ;
const Depot = require('../models/Depot') ;
const findAll = async (req, res) => {
    console.log(req.params);


let idclient=mongoose.Types.ObjectId(req.params.idclient);


User.aggregate([
    {

        $lookup:
        {
          from: "voitures",
          localField: "voiture.id",
          foreignField: "_id",
          as: "voiture"
        }
    },
    {
        $unwind: "$voiture"
    },
    {
        $match: {
            $and: [
                {"_id":idclient},
                {"voiture.etat":0}
            ]
            
        }
    },
      
    {
        $project:
        {
            voiture:1
        }
    },
]).exec(function (err, facture) {
    if (err) {
        sendResult(res,err);
    } else {
    sendResult(res, facture);
};
})
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
                    if (err) return  sendResult(res,err);
                    sendResult(res,user);
                }
            );
        }
    });
}






const recuperation = async (req, res) => {
    console.log(req.params);
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
            $match: {
                $and: [
                    {"depot.idvoiture":idvoiture},
                    {"depot.etat":2}
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
       
      ]).exec(function (err, recup) {
        if (err) {
            sendResult(res, err);
        } else {
       console.log(recup[0]);
            if(recup[0].bonsortie.etatLivraison!=1)
               {
                return  res.send({message:"bon de sortie non validé",error:true});
               }
               else
               {
             Voiture.updateOne({ _id: recup[0].depot.idvoiture},{ $set: {etat:0} },(err,voiture) => {
            if (err) return sendResult(res,err);
             Depot.updateOne({idvoiture: recup[0].depot.idvoiture,etat:2},{$set:{etat:3}},(err,depot) => {
                if (err) return sendResult(res,err);
                res.send({message:"voiture recupere",error:false});
             }) 
             
        });
       }
               }
    })
    //    if(recup.idbonsortie.etatLivraison!=1)
    //    {
    //     return  res.send({message:"bon de sortie non validé",error:true});
    //    }
    //    else
    //    {
    //     Voiture.updateOne({ _id: recup.iddepot.idvoiture},{ $set: {etat:0} },(err,voiture) => {
    //         if (err) return sendResult(res,err);
    //         res.send({message:"bon de sortie non validé",error:false})
    //     });
    //    }
   
      
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
    findAll ,
    save ,
    recuperation,
    findAllWhereEtatVoitureGaraga
}