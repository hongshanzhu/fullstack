const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers");

const app = express();

//app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);

module.exports = app;