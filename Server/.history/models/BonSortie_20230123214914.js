const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const BonSchema = new Schema({

    idFacture:{ type: ObjectId, ref: "Facture", required: true } ,
    etatLivraison:{type: String, required: true},
    dateSortie:{type: Date, required: true},

   

      

}) ;

module.exports = mongoose.model("BonSortie",BonSchema) ;