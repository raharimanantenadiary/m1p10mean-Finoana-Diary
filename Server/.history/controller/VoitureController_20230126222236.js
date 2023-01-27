const Voiture = require("../models/Voiture") ;
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
    Voiture.updateOne ({ _id: req.body.idvoiture}, 
        { $set: {etat: 0 } }, function(err, result) {
            if (err) {
                sendResult(res, err);
            } else {
              console.log(result);
            }
          });
       
}

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