const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const {mongoose} = require('./connect');

var app = express();
var employeController = require('./controller/empcontroller');

app.use(bodyParser.json());

app.use('/test',  employeController);




app.listen(4900);
