const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer(function (req,res){
    var q = url.parse(req.url, true)
    var num = req.url.substring(1)
    var d = new Date() // falta aqui cenas
    
    fs.readFile('./arq/pag' +num+ '.html', function (err,data) {
        res.writeHead(200, {'ContentType': 'text/html'})
        if(err){
            res.write("<p> Erro bro <p/>")
        }
        else{
            res.write(data)
        }
        res.end()
    })
}).listen(7777)