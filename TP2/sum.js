const http = require('http')
const url = require('url')

http.createServer(function (req,res) {
    var q = url.parse(req.url, true).query
    var d = new Date() // falta aqui cenas
    console.log(req.method + " " + req.url + " " + d)
    
    if (url.parse(req.url, true).pathname == "/soma") {

        sum = parseInt(q.a) + parseInt(q.b)
        res.writeHead(200, {'ContentType': 'text/html'})
        res.write("<p>" + sum  + "</p>")
        res.end()
    }
    else{
        res.writeHead(200, {'ContentType': 'text/html'})
        res.end('<p> rota uncool' + req.url +  ' </p>')
    }
}).listen(7777);