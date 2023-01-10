const express = require('express');
const {connect} = require('./db/connect');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});


connect("mongodb://localhost:27017/", (err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("Connexion avec la base de données établie");
    app.listen(8888);
    console.log("Attente des requêtes au port 8888");
  }
});

// app.listen(8888, () => {
//   console.log('Server started on port 8888');
// });