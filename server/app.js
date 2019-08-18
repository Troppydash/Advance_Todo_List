var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var database = require('./routes/Model/Database');
var indexRouter = require('./routes/index');

var app = express();

const db = database;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index Router
app.use('/', indexRouter);

module.exports = app;
