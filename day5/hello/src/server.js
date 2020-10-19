var express = require("express");
var path = require("path");
var multer = require("multer");

var router = require("./routers");

const UPLOADPATH = path.join(__dirname, '/public/upload/');

var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADPATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

app.use(multer({ storage: storage }).array('image'));
app.use(express.static('public'))
app.use('/', router);

module.exports = app;