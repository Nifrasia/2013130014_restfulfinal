var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const config = require('./config/index')
const passport = require('passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

const errorHandler = require('./middleware/errorHandler')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URI, () => {
  console.log("Connected to MongoDB");
});

// mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use(errorHandler)
module.exports = app;
