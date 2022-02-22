const http = require('http')
const url = require('url')

http.createServer(function (req,res) {
    res.writeHead(200, {'ContentType': 'text/html'})
    var q = url.parse(req.url, true).query
    res.write("<pre>" + JSON.stringify(q)  + "</pre>")
    var qt = url.parse(req.url, false).query
    res.write("<pre>" + JSON.stringify(qt)  + "</pre>")
    res.end()
}).listen(7777);