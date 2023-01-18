const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const FactureSchema = new Schema({

    idreparation: { type: ObjectId, ref: "Reparation", required: true } ,
    datefacture:{type: Date,default: Date.now, required: true},
    etat:{type: Number, required: true},

    paiement:{
        datepaiement:{type: Date},
    }
     

   

      

}) ;

module.exports = mongoose.model("Facture",FactureSchema) ;