const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const DepotSchema = new Schema({
    idvoiture: { type: ObjectId, ref: "Voiture", required: true},
    idclient: { type: ObjectId, ref: "User", required: true},
    datedepot:{ type: Date,default: Date.now, required: true},
    etat:{type: Number, required: true}


}) ;

module.exports = mongoose.model("Depot",DepotSchema) ;