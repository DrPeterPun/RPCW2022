var express = require('express');
//const { response } = require('../app');
var router = express.Router();
var axios = require('axios');

var Student = require("../controler/student")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res, next) {
  Student.list()
    .then( data=> res.render('students',{list:data}))
    .catch(error => res.render('error', {error: error}))
});

router.get('/students/register', (req,res) => {
  res.render('student_form')
});

router.get('/students/:id', (req,res) => {
  Student.lookup(req.params.id)
    .then( student => res.render('student-record',{list:student}))
    .catch(e => res.render('error', {error: e}))
});

router.post('/students', (req,res) => {
  var student = {
    nome: req.body.id,
    numero: req.body.numero,
    git: req.body.git,
    tpc: [req.body.tpc1,req.body.tpc2,req.body.tpc3,req.body.tpc4,req.body.tpc5,req.body.tpc6,req.body.tpc7,req.body.tpc8]
  }
  Student.insert(student)
    .then( data => res.render('newStudent',{list:data}))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
