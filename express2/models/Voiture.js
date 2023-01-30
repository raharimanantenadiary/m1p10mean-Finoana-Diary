const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const VoitureSchema = new Schema({
      marque:{ type: String},
      designation:{ type: String},
      matricule:{ type: String,
        validate: {
          validator: async function(matricule) {
            const user = await this.constructor.findOne({matricule});
            if(user) {
              if(this.id === user.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'cette matricule est deja utilisé.'
        },
    },
    etat:{type: Number, required: true}

   
  
}) ;

module.exports = mongoose.model("Voiture",VoitureSchema) ;