var http = require('http');
var meta = require('./metadados')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write("<p>criado com o node js por :" + meta.myDataTime );
    res.end("</p>");
}).listen(7777);
