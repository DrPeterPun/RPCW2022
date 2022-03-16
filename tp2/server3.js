var http = require('http');
var meta = require('./metadados')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write(req.url);
    res.end();
}).listen(7777);

console.log()