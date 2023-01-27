const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const ReparationSchema = new Schema({
    iddepot: { type: ObjectId, ref: "Depot", required: true } ,
    idfacture:{ type: ObjectId, ref: "Facture" } ,
    idbonsortie:{ type: ObjectId, ref: "BonSortie" } ,

    diagnostic:[{
        partie:{ type: String } ,
        avancement:{ type: Number } ,
        montant:{ type: Number },
        details:{ type: String } ,
        duree:{ type: Number }   
    }],

    datereparation:{ type: String,default: Date.now, required: true } ,
    datefinreparation:{ type: String,default: Date.now} 






}) ;

module.exports = mongoose.model("Reparation",ReparationSchema) ;