const Reparation = require("../models/Reparation") ;
const Depot = require("../models/Depot") ;


const findByClient = async (req, res) => {
    await Reparation.find({})
    .populate({path:'iddepot',match:{idclient:req.body.idclient,etat:1 }})
    .exec(function (err, voiture) {
        if (err) {
            console.log(err);
        } else {
        sendResult(res, voiture);
    }
});
}

const findReparation = async (req, res) => {
    await Reparation.find({id: req.body.id},{diagnostic:1}).exec(function (err, voiture) {
        if (err) {
            console.log(err);
        } else {
        sendResult(res, voiture);
   
}})
};


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


const ajoutDiagnostic = async (req, res) => {
   
    Reparation.findOneAndUpdate(
        { id: req.body.id}, // find the client by email
        { $push: { diagnostic: {partie:req.body.partie,avancement:0,montant:req.body.montant,details:req.body.details} }}, // add the new role to the 'roles' array
        { new: true }, // return the updated document
        (err, user) => {
            if (err) return sendResult(res,err);
            sendResult(res,user);
        }
    ); 
};

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
    save,
    ajoutDiagnostic,
    findReparation
}