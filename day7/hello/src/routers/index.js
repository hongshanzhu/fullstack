const express=require("express");
const dao = require("../dao/db");

const router=express.Router();

router.get("/login", function(req,res){
    console.dir(req.query);
    try{
        dao.queryUser({username:req.query.user},function(err,record){
            if(err){
                console.log(err);
                throw error;
            }
            console.log(record);
            if(record  && record.password == req.query.password){
                res.send(`${req.query.user}:登陆成功`);
            }else{
                res.send(`${req.query.user}:登陆失败,检查登陆信息是否正确`);
            }
        });
    } catch(error){
        console.log(error);
        res.send(`${req.body.user}: 登陆失败`);
    }    
})

router.post("/register", function(req,res){
    console.dir(req.body); 
    try{
        if(req.body.psw == req.body.pswa){
            dao.addUser({username:req.body.user,password:req.body.psw},function(err,record){
                if(err){
                    console.log(error);
                    res.send(`${req.body.user}: 注册失败:,检查登陆信息是否正确`);
                }else{
                    res.send(`${req.body.user}: 注册成功`);
                }
            });            
        } else {
            res.send(`${req.body.user}: 注册失败:,检查登陆信息是否正确`);
        }        
    } catch(error){
        console.log(error);
        res.send(`${req.body.user}: 注册失败`);
    }
    
})
module.exports = router;
