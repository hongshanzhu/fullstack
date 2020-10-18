var express=require("express");
var path=require("path");
var multer=require("multer");

var app=express();

const UPLOADPATH =path.join( __dirname , '/public/upload/');

app.use(multer({ dest: UPLOADPATH}).single('image'));
app.use(express.static('public'))
app.post("/file/uploader", function(req,res){
    console.dir(req.file);
    var resObj = {
        code: 1,
        des: '上传成功'
    };
    res.send(resObj);
})

module.exports = app;