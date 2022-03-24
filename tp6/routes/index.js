var express = require('express');
//const { response } = require('../app');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alunos', function(req, res, next) {
  console.log("ASDFASDFASDFAF")
  axios.get("http://localhost:3000/alunos").then(resp => {
    var lista = resp.data
    console.log("////////   ///////////////////////////////////////////////////////////////\nASDFASDFASDFAF")
    res.render('alunos', {alunos : lista, title: 'TETAS'})
  }).catch(function (erro) {
    res.render('error', {error : erro})
  })
  //res.render('index', { title: 'Express' });
});

router.get('/alunos/:id', function(req, res, next) {
  id = req.params.id
  axios.get("http://localhost:3000/alunos/?Id="+id).then(resp => {
    var al = resp.data[0]
    res.render('aluno', {aluno : al})
  }).catch(function (erro) {
    res.render('error', {error : erro})
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
