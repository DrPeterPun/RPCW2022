const fs = require('fs')
const url = require('url')
const http = require('http')

http.createServer(function (req,res) {
    var q = url.parse(req.url, true)
    var path = url.parse(req.url, true).pathname
    if(path.split("/").length==3){
        console.log(path)
        serveFile(path,res)
    }

}).listen(12345)

function serveFile(path,res) {
    var p = path.split("/")
    var movie = 'htmls/'+p[1]+'/'+p[2]+'.html'
    console.log(movie)
    fs.readFile(movie, function (err,data) {
        res.writeHead(200, {'ContentType': 'text/html'})
        if(err){
            res.write("<p> Internal Error <p/>")
        }
        else{
            res.write(data)
        }
        res.end()
    })
}