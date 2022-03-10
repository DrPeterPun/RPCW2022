/* eslint-disable no-undef */
const fs = require('fs')
const url = require('url')
const http = require('http')
const axios = require('axios')
const { table } = require('console')
const port = 4000


console.log("a ouvir a porta" + port)
http.createServer(function (req,res) {
    var parsedurl = url.parse(req.url, true)
    var path = parsedurl.pathname
    
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    var spath = path.split("/")
    // localhost:4000/
    // "menu", html com links para os 3 outros menus
    if(path == "/"){
        send(buildMenu(),res)
    // lista de cursos, alunos ou instrumentos
    }else if (spath.length==2) {
        if (spath[1]=="cursos") {
            serveCursos(res)            
        }else if (spath[1]=="alunos"){
            serveAlunos(res)
        }else if (spath[1]=="instrumentos"){
            serveInsts(res)
        }else if (spath[1]=="favicon.ico"){
            serveIcon(res)
        }else{
            serve404(res,false)
        }
    // paginas especificas por id
    }else if(spath.length == 3){
        if (spath[1]=="cursos") {
            serveCurso(res,spath[2])            
        }else if (spath[1]=="instrumentos"){
            serveInst(res,spath[2])
        }else{
            serve404(res,false)
        }
    }else{
        serve404(res,false)
    }
}).listen(port)

function send(body,res) {

    res.writeHead(200, {'ContentType': 'text/html'})
    res.write(body)
    res.end()
}

function serve404(res,err) {
    res.writeHead(400, {'ContentType': 'text/html'})
    if(!err){
        res.write("Invalid url")
        console.log("Invalid url")
    }
    else{
        res.write(err)
        console.log(err)
    }
    res.end()
}

function serveIcon(res) {
    fs.readFile("favicon.ico", function(err,data){
        if (err){
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200)
        res.end(data)
    })
}

function serveCursos(res) {
    getReq("cursos",resp => {
        send(buildhtml("Cursos",buildTableCursos(resp) ),res)
    })
}

function serveAlunos(res) {
    getReq("alunos",resp => {
        send(buildhtml("Alunos",buildTableAlunos(resp) ),res)
    })
}

function serveInsts(res) {
   getReq("instrumentos",resp => {
        send(buildhtml("Instrumentos",buildTableInst(resp) ),res)
    })
}

//alunos que estao no curs
function serveCurso(res,id) {
    getReq(`alunos?curso=${id}`,resp => {
        send(buildhtml(`Alunos no curso: ${id}`,buildTableAlunos(resp) ),res)
    })
}

function serveInst(res,id) {
    getReq(`cursos?q=${id}`,resp1 => {
        nome = resp1.data[0].instrumento.text
        getReq(`alunos?instrumento=${nome}`, resp2 => {
            send(   
                buildhtml(`Cursos de: ${nome}`,buildTableCursos(resp1) ) + 
                buildhtml(`Alunos que tocam: ${nome}`,buildTableAlunos(resp2)) 
                ,res ) 
        })
    })
}
function buildhtml(title,body) {
    string = `
<!DOCTYPE html>
<html>
<style>
table, th, td {
  border:1px solid black;
}
</style>
    <head>
        <title>${title}</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>${title}</h1>
        ${body}
    </body>
</html>`
    return string
}



function getReq(path,func) {
    console.log("db: " + `http://localhost:3000/${path}`)
    axios.get(`http://localhost:3000/${path}`).then(func).catch(error => { console.log(error) } )
} 

function buildMenu() {
    body = `
        <a href="http://localhost:${port}/alunos"> lista de alunos </a> <br/>
        <a href="http://localhost:${port}/cursos"> lista de cursos </a> <br/>
        <a href="http://localhost:${port}/instrumentos"> lista de instrumentos </a> <br/>`

    return buildhtml("Menu",body)
}

function buildTableAlunos(resp) {
    var table = `
<table>
    <tr>
        <th>id</th>
        <th>nome</th>
        <th>curso</th>
        <th>instrumento</th>
    </tr>`
    var array = new Array
    if (resp.status == 404){
        "nao existe, fake 404?"
    }
    cursos = resp.data;
    cursos.forEach(a => {
        array.push(`
    <tr>
        <th>${a.id}</th>
        <th>${a.nome}</th>
        <th>${a.curso}</th>
        <th>${a.instrumento}</th>
    </tr>`)
        });
        table = table.concat(array.join(""))
        table = table.concat("\n</table>")
        return table
}

function buildTableCursos(resp) {
    var table = `
<table>
    <tr>
        <th>id</th>
        <th>designacao</th>
        <th>duracao</th>
        <th>instrumento</th>
    </tr>`
    var array = new Array

    if (resp.status == 404){
        return "nao existe, fake 404?"
    }
    cursos = resp.data;
    cursos.forEach(c => {
        array.push(`
    <tr>
        <th><a href="http://localhost:${port}/cursos/${c.id}"> ${c.id} </a></th>
        <th>${c.designacao}</th>
        <th>${c.duracao}</th>
        <th>${c.instrumento.text}</th>
    </tr>`)
        });
        table = table.concat(array.join(""))
        table = table.concat("\n</table>")
        return table
}

function buildTableInst(resp) {
    var table = `
<table>
    <tr>
        <th>id</th>
        <th>instrumento</th>
    </tr>`
    var array = new Array

    cursos = resp.data;
    cursos.forEach(i => {
        array.push(`
    <tr>
        <th><a href="http://localhost:${port}/instrumentos/${i.id}"> ${i.id} </a></th>
        <th>${i.text}</th>
    </tr>`)
        });
        table = table.concat(array.join(""))
        table = table.concat("\n</table>")
        return table
}