const Depot = require("../models/Depot") ;


const findByClient = async (req, res) => {
    await Depot.find({idclient:req.body.idclient})
    .populate('idclient')
    .populate('idvoiture')
    .exec(function (err, voiture) {
        if (err) {
            // gestion des erreurs
        } else {
        sendResult(res, voiture);
    }
});
}

const save = async (req, res) => {
    await new Depot({idvoiture:req.body.idvoiture,idclient:req.body.idclient,datedepot:req.body.date,etat:0}).save(function(error, depot) {
        if (error) {
            console.log(error)
        } else {
           
            sendResult(res,depot);
        }
    }
    );
        

  
} ;

// const roleClient = async () => {
//     return Role.findOne({intitule: 'Client'}).then((result) => { return result ; }) ;
// } ;

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