var http = require('http')
var axios = require('axios')
var fs = require('fs')

const lh = "http://localhost:3000/"

// Funções auxilidares
// Template para a página com a lista de alunos ------------------
function genMainPage(){
    let pagHTML = `
    <html>
        <head>
            <title>ToDo List</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
`
    
    pagHTML += genForm()

    pagHTML += genTaskList()

    pagHTML += genResolved()

    pagHTML +=`
    </html>
  `
  return pagHTML
}

// Template para o formulário de aluno ------------------
function genForm(){
    return `
            <form class="w3-container" action="/alunos" method="POST">
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

function genTaskList(){
}

// Criação do servidor
var tdserver = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
            // GET /alunos --------------------------------------------------------------------
            if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(getMainPage())
                    res.end()
                })
            }
            else{
    
                constres.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            // POST REQUEST

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
