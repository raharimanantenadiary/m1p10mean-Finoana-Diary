
const Depense= require("../models/Depense") ;
const TypeDepense= require("../models/TypeDepense") ;



const findAll = async (req, res) => {
    await TypeDepense.find({}).exec(function (err, type) {
        if (err) {
            sendResult(res,err);
        } else {
        sendResult(res, type);
    }
});
}




const save = async (req, res) => {
    await new Depense({datedepense:req.body.date,typedepense:req.body.idtype,montant:req.body.montant}).save(function(error,depense) {
        if (error) {
            sendResult(res,error);
        } else { 
            sendResult(res,depense);
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
    save,
    findAll

}