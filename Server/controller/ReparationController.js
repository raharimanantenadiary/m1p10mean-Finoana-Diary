const Reparation = require("../models/Reparation") ;
const Depot = require("../models/Depot") ;


const findByClient = async (req, res) => {
    await Reparation.find({})
    .populate({path:'iddepot',match:{idclient:req.body.idclient }})
    .exec(function (err, voiture) {
        if (err) {
            console.log(err);
        } else {
        sendResult(res, voiture);
    }
});
}

const save = async (req, res) => {
    await new Reparation({iddepot:req.body.iddepot,datereparation:req.body.date}).save(function(error, reparation) {
        if (error) {
            console.log(error)
        } else {
            Depot.updateOne ({ _id: req.body.iddepot}, 
            { $set: {etat: 1 } }, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                  console.log(result);
                }
              });
           
            sendResult(res,reparation);
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