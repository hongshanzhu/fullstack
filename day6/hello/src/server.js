var express = require("express");
var bodyParser = require("body-parser");
var router = require("./routers");

var app = express();

//app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);

module.exports = app;