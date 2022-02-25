const fs = require('fs')
const url = require('url')
const http = require('http')
const port = 12345

console.log("a ouvir a porta" + port)
http.createServer(function (req,res) {
    var q = url.parse(req.url, true)
    var path = url.parse(req.url, true).pathname
    
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    //either single actor or single movie
    var spath = path.split("/")
    if(spath.length==3){
        console.log(path)
        serveFile(path,res)
    //necesserely its an index file
    }else if (spath.length==2) {
        if (spath[1]=="filmes") {
            serveIndex("index/movieIndex.html",res)            
        }else if (spath[1]=="atores"){
            serveIndex("index/actorIndex.html",res)
        }else{

        }
    } 
}).listen(port)

function serveIndex(file,res) {
    console.log(file)
    fs.readFile(file, function (err,data) {
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


function serveFile(path,res) {
    var p = path.split("/")
    var file = 'htmls/'+p[1]+'/'+p[2]+'.html'
    console.log(file)
    fs.readFile(file, function (err,data) {
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

function serveError(res) {
    console.log("Invalid url")
    res.writeHead(400, {'ContentType': 'text/html'})
    if(err){
        res.write("Invalid url")
    }
    else{
        res.write(data)
    }
    res.end()
}