const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const UserSchema = new Schema({

    voiture:{ 
      id:{ type: String} ,
      marque:{ type: String},
      designation:{ type: String},
      matricule:{ type: String,
        validate: {
          validator: async function(matricule) {
            const user = await this.constructor.findOne({matricule });
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
     },required: true
    },
    datedepot:{ type: Date, required: true},

   
  
}) ;

module.exports = mongoose.model("User",UserSchema) ;