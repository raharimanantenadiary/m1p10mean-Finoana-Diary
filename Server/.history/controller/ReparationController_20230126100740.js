const Reparation = require("../models/Reparation") ;
const Depot = require("../models/Depot") ;



const findAllReparation = async (req, res) => {
    await Depot.find({etat:1})
    .populate('idvoiture')
    .populate({path:'idclient',select:'username' })
    .exec(function (err, depot) {
        if (err) {
            // gestion des erreurs
        } else {
        sendResult(res, depot);
    }
});
}

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

const findReparation = async (req, res) => {
    console.log(req.body.id);
    await Reparation.find({_id: req.body.id},{diagnostic:1}).exec(function (err, reparation) {
        if (err) {
            sendResult(res, err);
        } else {
        sendResult(res, reparation);
   
}})
};

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

const DeleteDiagnostic = async (req, res) => {
   
    Reparation.Delete(
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
    findReparation,
    historiqueReparation,
    findAllReparation,
    findReparationByDepot
}