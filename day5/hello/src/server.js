var express=require("express");
var path=require("path");
var multer=require("multer");

var router=require("./routers");

const UPLOADPATH =path.join( __dirname , '/public/upload/');

var app=express();

app.use(multer({ dest: UPLOADPATH}).array('image'));
app.use(express.static('public'))
app.use('/',router);

module.exports = app;