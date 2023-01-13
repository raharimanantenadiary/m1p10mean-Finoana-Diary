const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;

const UserSchema = new Schema({
    username: { type: String, required: true } ,
    mail: { type: String, required: true } ,
    mdp: { type: String, required: true } ,
}) ;

module.exports = mongoose.model("Client",UserSchema) ;