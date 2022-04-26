var express = require('express');
var router = express.Router();
var Casamento = require('../controllers/casamento')


router.get('/casamentos', function(req, res, next) {
  
  if(req.query['ano'] != undefined){
    Casamento.listarPorAno(req.query['ano'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(500).jsonp({erro: e})
      })
  }
  else if(req.query['nome'] != undefined){
    Casamento.listarPorNome(req.query['nome'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(501).jsonp({erro: e})
      })
  }
  else if(req.query['byAno'] != undefined && req.query['byAno'] == "true"){
    Casamento.listar()
      // inversão estrutural em JavaScript
      .then(dados => {

        var porAno = {}

        dados.forEach(c => {
          var ano = c.date.substring(0,4)

          if(porAno[ano]!=undefined){
            porAno[ano].push({"id": c['_id'], "title": c['title']})
          }
          else{
            porAno[ano] = [{"id": c['_id'], "title": c['title']}]
          }

        })
        res.status(200).jsonp(porAno)
      })
      .catch(e => {
        res.status(504).jsonp({erro: e})
      })
    
  }  
  else{
    Casamento.listar()
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(502).jsonp({erro: e})
      })
  }

}); 

router.get('/casamentos/noivos', function(req,res){
  Casamento.listar()
    .then(dados => {

      var noivos = []
      nomeFiltro = /.+?:\s+(.+?)\s+c\.c\.\s+(.+?)/

      dados.forEach(c => {
        let nomes = c.title.match(nomeFiltro)
        if(!noivos.includes(nomes[1])){
          noivos.push({"noivo": nomes[1], "id": c._id})
        }
      })

      noivos.sort((n1, n2) => (n1.noivo > n2.noivo) ? 1 : -1)

      res.status(200).jsonp(noivos)
    })
    .catch(e => {
      res.status(505).jsonp({erro: e})
    })
})

router.get('/casamentos/:id', function(req,res){
  Casamento.consultar(req.params.id)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(e => {
      res.status(503).jsonp({erro: e})
    })
})


module.exports = router;
