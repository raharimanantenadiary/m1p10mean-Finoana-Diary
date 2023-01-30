const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;


const FactureSchema = new Schema({
    reference:{ type: String,unique: true},
    datefacture:{type: Date,default: Date.now, required: true},
    etat:{type: Number, required: true},
   
     

      

}) ;

FactureSchema.pre("save", function (next) {
    if (!this.reference) {
      this.reference = generateUniqueRef();
    }
    next();
  });
  let refCounter = 0;
  function generateUniqueRef() {
    refCounter++;
    const facture ='FCT';
    return `${facture}-${String(refCounter).padStart(4, "0")}`;
  }


module.exports = mongoose.model("Facture",FactureSchema) ;