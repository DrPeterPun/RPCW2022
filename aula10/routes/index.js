var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, ) {
  axios.get('/api/ficheiros')
    .then(function name(dados) {
      res.render('index',{lista:dados.data})
    })
    .catch(function name(erro) {
      res.render('error',{error:erro})
    })
});

router.get('/dowload/:fnome', function(req, res, ) {
  res.download(__dirname + '/../public/ficheiros' + req.params)
});

module.exports = router;
