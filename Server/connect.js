const mongoose = require('mongoose');

// Connexion à la base de données
mongoose.connect('mongodb+srv://mongo221:mongo221@cluster0.tmp4mwz.mongodb.net/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Gestion des erreurs de connexion
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


module.exports = mongoose;