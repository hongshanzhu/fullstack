const mysql = require("mysql");
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"110120",
    database:"test"
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        if(err){
           callback(err,null);
           return
        }
        connection.query(sql, function (err,rows) {            
            callback(err,rows);
            connection.release();
        });
    });
}

module.exports = query;
