const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const UserSchema = new Schema({
    username: { type: String, required: true } ,
    mail: { type: String,
    required: true,
    match: [/.+\@.+\..+/,'entrée une adresse email valide'],
    validate: {
        validator: async function(mail) {
          const user = await this.constructor.findOne({ mail });
          if(user) {
            if(this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: props => 'cette adresse email est deja utilisé.'
      },
   } ,
    mdp: { type: String, required: true } ,
    role:{ 
    roleId:{ type: String, required: true } ,
    intitule:{ type: String, required: true },
    },
  
}) ;

module.exports = mongoose.model("User",UserSchema) ;