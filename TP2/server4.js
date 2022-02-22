var http = require('http');

myserver = http.createServer(function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            console.dir(req.url)
            res.write(req.url)
            res.end();
    })

myserver.listen(7777)

console.log()
