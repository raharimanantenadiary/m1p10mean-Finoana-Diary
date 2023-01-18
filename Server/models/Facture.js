const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const FactureSchema = new Schema({

    idvoiture: { type: ObjectId, ref: "Voiture", required: true } ,
    datefacture:{type: Date, required: true},
    etat:{type: String, required: true},

    paiement:{
        datepaiement:{type: Date},
    }
     

   

      

}) ;

module.exports = mongoose.model("Facture",FactureSchema) ;