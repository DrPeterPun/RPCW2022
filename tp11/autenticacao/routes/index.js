var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res) {
  console.log("na cb da homepage")
  console.log(req.sessionID)
  res.render('index');
});

router.get('/login', function(req, res) {
  console.log("na cb do get login")
  console.log(req.sessionID)
  res.render('login-form');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("na cb do post login")
  console.log("auth" + JSON.stringify(req.user))
  res.redirect('/protegida')
});

function verificaAutenticacao(req,res,next){
  console.log("user verif." + JSON.stringify(req.user))
  if (req.isAuthenticated()){
    next()
  }
  else{
    res.redirect("/login")
  }
}

router.get('/protegida', verificaAutenticacao, (req,res) => {
  res.send("<p>atingiste a area protegida" + JSON.stringify(req.user) + "</p>")
})

module.exports = router;