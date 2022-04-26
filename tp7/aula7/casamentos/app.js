var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

// configurar ligação ao Mongo
var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/CurralDasFreiras'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection

// testar se a ligação correu bem 
// sempre que se deparar com um erro, esta avisa
db.on('error', function() {
  console.log('Erro na conexão ao MongoDB...')
})
// função executada apenas uma vez
db.once('open', function(){
  console.log('Conexão ao MongoDB efetuada com sucesso!')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

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
  res.jsonp('error');
});

module.exports = app;
