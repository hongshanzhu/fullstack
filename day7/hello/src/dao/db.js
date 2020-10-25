var mysqlClient= require("./mysql");

function addUser (userInfo,callabck){
    console.log("addUser:"+ userInfo);
    var sql= `insert into user(username,password) values('${userInfo.username}','${userInfo.password}')`;
    console.log("sql:"+ sql);
    mysqlClient(sql,function(err,rows){
        if(err){
            console.log("err:"+err);
            callabck(err,null);
        } else{
            console.log("addUser result:");
            console.log(rows);
            callabck(null,rows);
        }
    })
}

function queryUser (userInfo,callabck){
    console.log("queryUser:"+ userInfo);
    var sql= `select * from user where username='${userInfo.username}'`;
    console.log("sql:"+ sql);
    mysqlClient(sql, function(err,rows){
        if(err){
            console.log("err:"+err);
            callabck(err,null);
        } else{            
            rows && rows.length>0 ?  callabck(null,rows[0]): callabck(null,null);
        }
    })
}
exports.addUser = addUser;
exports.queryUser = queryUser;
