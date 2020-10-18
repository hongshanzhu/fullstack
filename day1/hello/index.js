var http=require("http")
var fs=require("fs")

http.createServer(function (req, res) {
	fs.readFile("./index.html",function (err,data){
		if(err){
			res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
			return;
		}else{
			res.writeHead(200,{"Content-Type": "text/html"});
		    res.end(data);
		}		
	});
}).listen(3000);
console.log("Server running at localhost:3000");