const Voiture = require("../models/Voiture") ;
const Depot = require("../models/Depot") ;
const Reparation = require("../models/Reparation") ;
const User = require("../models/User") ;
const mongoose=require("mongoose");

const findAllWhereEtatVoitureGaraga = async (req, res) => {
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
                {"voiture.etat":1}
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
                    if (err) return handleError(err);
                    sendResult(res,user);
                }
            );
        }
    });
}






const recuperation = async (req, res) => {
    console.log("idvoiture: ",req.body.idvoiture);
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
       console.log(recup[0].bonsortie.etatLivraison==0);
       //misy le voiture fa ts6 bon de sortie 
       if(recup[0].bonsortie != null ) return   res.send({message:"voiture non lier à une bon de sortie",error:true});

             if(recup[0].bonsortie.etatLivraison == 0)
               {
                return  res.send({message:"bon de sortie non validé",error:true});
               }
            if(recup[0].bonsortie.etatLivraison == 1){
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
      
    };

    
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