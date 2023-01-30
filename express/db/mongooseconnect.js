const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://mean:mdpprom13@mean1340.lmu1flv.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Mongoose connecté");
  })
  .catch((err) => console.log(err));