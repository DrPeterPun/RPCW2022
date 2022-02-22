const http = require('http')

http.createServer(function (req,res) {
    var d = new Date().toISOString().substring(0,16)
    res.writeHead(200, {'ContentType': 'text/html'})
    console.log(req.method + " " + req.url + " " + d)
    res.write("<pre>" + req.method + " " + req.url + " " + d + "</pre>")
}).listen(7777);