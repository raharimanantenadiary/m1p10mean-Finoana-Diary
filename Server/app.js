var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/UserRoute');
var authRouter = require('./routes/AuthRoute');
var voitureRouter = require('./routes/VoitureRoute');
var depotRouter = require('./routes/DepotRoute');
var reparationRouter = require('./routes/ReparationRoute');

var app = express();


require('./db/connection') ;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*******************
*    MIDDLEWARE    *
*******************/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*************
*    PATH    *
*************/
app.use('/api/voiture', voitureRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/depot', depotRouter);
app.use('/api/reparation', reparationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
