const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const ReparationSchema = new Schema({
        iddepot: { type: ObjectId, ref: "Depot", required: true } ,
        diagnostic:[{
            partie:{ type: String } ,
            avancement:{ type: Number } ,
            montant:{ type: Number },
            details:{ type: String }  
        }],

        datereparation:{ type: String,default: Date.now, required: true } 




    

}) ;

module.exports = mongoose.model("Reparation",ReparationSchema) ;