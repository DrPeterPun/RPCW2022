var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');

var app = express();
const {v4: uuidv4} = require('uuid');
const session = require('express-session');
var FileStore = require('session-file-store')(session)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  genid: req =>{
    console.log('dentro do middleware')
    console.log(req.sessionID)
    return uuidv4()
  },
  secret: 'O meu segredo',
  resave: true,
  saveUninitialized: true,
  store: new FileStore()
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport')
var axios = require('axios');
var LoaclStrategy = require('passport-local')(session)

app.use(new LoaclStrategy(
  {usernameField: 'email'}, (email,password,done) => {
    axios.get('html://localhost:3000/users?email=' + email)
    .then(dados => {
      const user = dados.data
      if(!user) { return done(null,false,{message:"utilizador nao existe"})}
      if(password !=user.password) { return done(null,false,{message:"password invalida"})}
      return done(null,user)
    })
    .catch(erro => done(erro))
  })
)

passport.serializeUser((user,done) =>{
  console.log('vou serializar o user na sessao: ' + JSON.stringify(user))
  // o passport guarda a sessao aqui
  done(null,user,id)
})

passport.deserializeUser((udi,done) => {
  console.log('vou desserializar o user : ' + uid)
  axios.get('html://localhost:3000/user/' + uid)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro,false))
})

// ativar o passport
app.use(passport.initialize())
app.use(passport.session)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
