const Depot = require("../models/Depot") ;
const User = require("../models/Depot") ;

const findByClient = async (req, res) => {
    await Depot.find({idclient:req.body.idclient})
    .populate('idclient')
    .populate('idvoiture')
    .exec(function (err, depot) {
        if (err) {
            // gestion des erreurs
        } else {
        sendResult(res, depot);
    }
});
}

const save = async (req, res) => {
    await new Depot({idvoiture:req.body.idvoiture,idclient:req.body.idclient,datedepot:req.body.date,etat:0}).save(function(error, depot) {
        if (error) {
            sendResult(res,error);
        } else {
            Voiture.updateOne ({ _id: depot.idvoiture}, 
            { $set: {etat: 1 } }, function(err, result) {
                if (err) {
                    sendResult(res, err);
                } else {
                  console.log(result);
                }
              });
           
            sendResult(res,depot);
        }
    }
    );
        

  
} ;



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
    save 
}