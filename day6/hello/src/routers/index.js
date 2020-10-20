var express=require("express");

var router=express.Router();

router.get("/login", function(req,res){
    console.dir(req.query);    
    res.send(`${req.query.user}:登陆成功`);
})

router.post("/register", function(req,res){
    console.dir(req.body);    
    res.send(`${req.body.user}: 注册成功`);
})
module.exports = router;
