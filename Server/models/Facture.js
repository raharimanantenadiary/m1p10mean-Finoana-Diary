const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const FactureSchema = new Schema({
   
    datefacture:{type: Date,default: Date.now, required: true},
    etat:{type: Number, required: true},
   
     

   

      

}) ;

module.exports = mongoose.model("Facture",FactureSchema) ;