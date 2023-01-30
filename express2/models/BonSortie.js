const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const BonSchema = new Schema({
    reference:{ type: String,unique: true},
    etatLivraison:{type: String, required: true},
    dateSortie:{type: Date, required: true},

   

      

}) ;

BonSchema.pre("save", function (next) {
    if (!this.reference) {
      this.reference = generateUniqueRef();
    }
    next();
  });
  let refCounter = 0;
  function generateUniqueRef() {
    refCounter++;
    const bonsortie ='BS';
    return `${bonsortie}-${String(refCounter).padStart(4, "0")}`;
  }

module.exports = mongoose.model("BonSortie",BonSchema) ;