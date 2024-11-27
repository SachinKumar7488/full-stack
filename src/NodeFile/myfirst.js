var http = require('http');

http.createServer(function (req,res){
    res.writeHead(200,{'connect-Type': 'text/html'});
    res.end('Hello World! Brother');
}).listen(8080);