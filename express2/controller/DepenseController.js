
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
    await new Depense(
        {datedepense:new Date(),typedepense:req.body.idtype,montant:req.body.montant}).save(function(error,depense) {
        if (error) {
            sendResult(res,error);
        } else { 
            sendResult(res,depense);
        }
    }
    );
        

  
} ;

const saveTypeDep = async (req, res) => {
    await new TypeDepense({intitule:req.body.intitule}).save(function(error,depense) {
        if (error) {
            sendResult(res,error);
        } else { 
            sendResult(res,depense);
        }
    }
    );
        

  
} ;

const DepenseparMois = async (req, res,next,chiffre) => {
    Depense.aggregate([
        {
        $match: {
          
                    $expr: {
                        $eq: [
                          { $month: "$datedepense" },
                         parseInt(req.params.mois,10)
                        ]
                      }
        }  
        },
        {
            $group:
            {
            _id:null,
            sumDep:{ $sum:"$montant" }
            }
        }
        
       
      ]) .exec(function (err, depense) {
        if (err) {
            sendResult(res, err);
        } else {
            let benefice=0;
            let depensetotal=0;
            console.log(req.chiffre);
            let result = new Object();
            if(depense.length>0)
            {
            depensetotal=depense[0].sumDep;
            }
            benefice=req.chiffre-depensetotal;
            result.chiffre=req.chiffre;
            result.depense=depensetotal;
            result.benefice=benefice
            
            sendResult(res,result);
    
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
    findAll,
    DepenseparMois,
    saveTypeDep

}