var express=require("express");
var path=require("path");
var app=express();

app.get('/', (req, res) => {    
	var options = {
        root: __dirname,    
		headers: {
		  "Content-Type": "text/html"
		}
	}
	res.sendFile('index.html',options, function(error){
		if(error){
			console.log('Sent failed:', 'index.html' + error);
		}else{
			console.log('Sent sucess:', 'index.html');
		}
	});
});

module.exports = app;