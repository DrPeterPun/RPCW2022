var express = require('express');
var router = express.Router();
var axios = require('axios');
const json_path = 'http://localhost:3000/'


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title : 'Indice'})
});

router.get('/musicas/', function(req, res, next) {
    // /musicas
    axios.get(json_path + 'musicas').then( result => {
        console.log(" musicas geral" + result) 
        res.render('musicas',{title : 'Musicas', musicas : result.data})
    })
});


/* GET lista de musicas da provincia com aquele id . */
router.get('/musicas/prov/:prov', function(req, res, next) {
    axios.get(json_path + `musicas?prov=${req.params.prov}`).then( result => {
        res.render('musicas',{title : 'Provincia', musicas : result.data})
    })
});

/* GET manda um form para poder inserir uma nova musica. */
router.get('/musicas/inserir', function(req, res, next) {
    //request que pega no objeto com o maior id
    console.log("inserir get")
    res.render('inserir', { title: 'Inserir' });
});

//recebe o post com os dados relevantes
router.post('/musicas/inserir', function(req, res, next) {
    //request que pega no objeto com o maior id
    console.log("inserir post")
    const path = 'http://localhost:3000/musicas?_sort=id&_order=desc&_limit=1'
    payload = {
        "prov" : req.body.prov,
        "local" : req.body.local,
        "titulo" : req.body.titulo,
        "musico" : req.body.musico
    }
    axios.post(path,payload).then( response => {
        newid = response.body.id
        console.log(newid)
    })
    //mandar de volta para o indice de musicas
    res.redirect('/musicas')
});

/* GET musicas. */
router.get('/musicas/:id', function(req, res, next) {
    axios.get(json_path + `musicas/${req.params.id}`).then( result => {
        res.render('musica',{title : 'Musica', musica : result.data})
    })
});

module.exports = router;

