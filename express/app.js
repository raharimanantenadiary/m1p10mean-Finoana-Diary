var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var userRouter = require('./routes/UserRoute');
var authRouter = require('./routes/AuthRoute');
var voitureRouter = require('./routes/VoitureRoute');
var depotRouter = require('./routes/DepotRoute');
var reparationRouter = require('./routes/ReparationRoute');
var factureRouter = require('./routes/FactureRoute');
var bonsortieRouter = require('./routes/BonSortieRoute');
var depenseRouter = require('./routes/DepenseRoute');

const {
  connecter
} = require("./db/connect");


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require("./db/mongooseconnect");

app.use('/api/voiture', voitureRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/depot', depotRouter);
app.use('/api/reparation', reparationRouter);
app.use('/api/facture', factureRouter);
app.use('/api/bonsortie', bonsortieRouter);
app.use('/api/depense',depenseRouter);


// app.get('/profil/:id',function(req,res){
// res.send("id est ="+req.params)
// })


// A faire redirect Login click sur le lien login de mila makaty am back alo zany ny any am angular

connecter("mongodb+srv://mean:mdpprom13@mean1340.lmu1flv.mongodb.net/?retryWrites=true&w=majority", (erreur) => {
  if (erreur) {
    console.log("erreur lors de la connexion avec la base de données");
    console.log(erreur);
    process.exit(-1)
  } else {
    console.log("Connexion avec la base de données établie");
  }
})

module.exports = app;

/**
 * 
 * https://api-mean.onrender.com/
 * 
 * api-mean
 */