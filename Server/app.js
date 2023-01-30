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


var app = express();
require('./db/connection') ;
app.use(cors());




// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// /*******************
// *    MIDDLEWARE    *
// *******************/


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// /*************
// *    PATH    *
// *************/
app.use('/api/voiture', voitureRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/depot', depotRouter);
app.use('/api/reparation', reparationRouter);
app.use('/api/facture', factureRouter);
app.use('/api/bonsortie', bonsortieRouter);
app.use('/api/depense',depenseRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
