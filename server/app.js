var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/controllers/employee.controller');
var customerRouter = require('./routes/controllers/customer.controller');
var serviceRouter = require('./routes/controllers/service.controller');
var taskRouter = require('./routes/controllers/task.controller');
var invoiceRouter = require('./routes/controllers/invoice.controller');
var invoiceDetailRouter = require('./routes/controllers/invoice-detail.controller');
var statisticsRouter = require('./routes/controllers/statistics.controller');
const database = require('./config/db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/invoice', invoiceRouter);
app.use('/api/v1/invoice-detail', invoiceDetailRouter);
app.use('/api/v1/statistics', statisticsRouter);
database().then(() => {
  console.log('Connected to the database');
  //log link
  console.log('http://localhost:3000/');
}).catch(error => {
  console.log('Error connecting to the database');
  console.log(error);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
