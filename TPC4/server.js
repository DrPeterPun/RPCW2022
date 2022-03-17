var http = require('http')
var axios = require('axios')
var fs = require('fs')
var {parse} = require('querystring')

const lh = "http://localhost:3000/"

// Funções auxilidares
// Template para a página com a lista de alunos ------------------
async function genMainPage(){
    let pagHTML = `
    <html>
    <style>
    table, th, td {
      border:1px solid black;
    }
    </style>
 
        <head>
            <title>ToDo List</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
`
    
    pagHTML += genForm()

    //
    var tl = (await genTaskList()).data
    var r = (await genResolved()).data
   
    //FAZER AS TABELAS!   =--------------------------= 
    pagHTML += `<h2> Por completar </h2>`
    pagHTML += genTable(tl)
    console.log(tl)

    pagHTML += `<h2> Completas </h2>`
    pagHTML += genTable(r)
    console.log()
    pagHTML +=`
    </html>
  `
  return pagHTML
}

function genTable(data){
    body = `
    <table>
    <tr>
        <th>id</th>
        <th>nome</th>
        <th>tipo</th>
        <th>descricao</th>
        <th>data</th>
    </tr>`

    data.forEach(elem=> {
        body += `
    <tr>
        <th>${elem.id}</th>
        <th>${elem.nome}</th>
        <th>${elem.tipo}</th>
        <th>${elem.desc}</th>
        <th>${elem.data}</th>
        
        <th>
            <form class="w3-container" action="/tasks/${elem.id}" method="POST">
            <input class="w3-btn w3-blue-grey" type="submit" value="DEL"/>
        </form>
        </th>
        <th>
            <form class="w3-container" action="/tasks/${elem.id}" method="POST">
            <input class="w3-btn w3-blue-grey" type="submit" value="Marcar Completa"/>
        </form>
        </th>
    </tr>
`       
    });

    body += "\n</table>"
    return body

}


// faz o form
function genForm(){
    return `
            <form class="w3-container" action="/" method="POST">
                <label class="w3-text-teal"><b>Nome</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="nome">
          
                <label class="w3-text-teal"><b>Descricao</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">

                <label class="w3-text-teal"><b>Tipo</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="tipo">

                <input class="w3-btn w3-blue-grey" type="submit" value="Adicionar Tarefa"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
    `
}

// Gera a task list
function genTaskList(){
    return getReq("tasks?comp=no")
}

function genResolved(){
    return getReq("tasks?comp=yes")
}

function getReq(path) {
    var d = new Date().toISOString().substr(0, 16)
    console.log("db GET: " + `http://localhost:3000/${path}` + "  " + d)
    return axios.get(`http://localhost:3000/${path}`)
}

function postReq(path,body) {
    axios.post(`http://localhost:3000/${path}`, body).then(resp =>
        console.log(resp.data))
    .catch(error => {
        console.log('Error: ' + error);
    });   
}

// Criação do servidor
var tdserver = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
            // GET 
            if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    genMainPage().then(result => res.end(result))
            } else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            // POST REQUEST
            let body = ``
            req.on(`data`, chunk => {
                body+= chunk.toString()}) //converts buffer to string
            req.on(`end`, () => {
                const parsed = parse(body)
                console.log(parsed)

                var nome = parsed.nome
                var desc = parsed.descricao
                var tipo = parsed.tipo
                var data = new Date().toISOString().substr(0, 16)
                var comp = "no"

                const payload ={
                    "nome" : nome,
                    "desc" : desc,
                    "tipo" : tipo,
                    "data" : data,
                    "comp" : comp
                }

                postReq("tasks",payload)

                genMainPage().then(result => res.end(result))
            })

            break
        case "DELETE":
            // DELETE REQUEST
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

tdserver.listen(12345)
console.log('Servidor à escuta na porta 12345...')
