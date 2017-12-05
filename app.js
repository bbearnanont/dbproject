//use strict mode
'use strict';
//npm used
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var path = require('path');
var routing = require('./App/route/routing.js');

var port = 8000;

//setting up
app.set('views', path.join(__dirname, '/App/views'));

app.use(bodyParser());
app.engine('html', ejs.renderFile);  
app.listen(port);
app.use(express.static('public'));

routing(app);
