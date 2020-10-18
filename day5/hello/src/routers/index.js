var express=require("express");

var router=express.Router();

router.post("/file/uploader", function(req,res){
    console.dir(req.files);
    var resObj = {
        code: 1,
        des: '上传成功'
    };
    res.send(resObj);
})

module.exports = router;
