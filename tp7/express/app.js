var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mongoose = require('mongoose')
var app = express();
var jsonfile = require('jsonfile')
var multer = require('multer');
const { fstat } = require('fs');
var upload = multer({dest: 'uploads'})

var mongoDB = 'mongodb://127.0.0.1:27017/RPCW2022'
// fazer o connect ao mongodb, agr ja se pode fazer cenas a BD
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Erro de conexao ao mongodb'))
db.once('open',function () {
  console.log("conexao ao  mongodb realizada com sucesso")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

/////////////////////////////// segunda parte de aula
app.get('/', (req,res)=> { 
  var d =  new Date().toISOString().substring(0,16)
  var files = jsonfile.readFileSync('./dbFiles.json')
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  res.write(templates.fileList(files,d))
  res.end()
})

app.get('/files/upload', (req,res) => {
  var d =  new Date().toISOString().substring(0,16)
  var files = jsonfile.readFileSync('./dbFiles.json')
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  res.write(templates.fileForm(d))
  res.end()
})

app.post('/files', upload.single('MyFile'), (res,req) => {
  let oldpath = __dirname + '/' + req.file.path
  let newpath = __dirname + '/fileStore/' + req.file.path
 
  fs.rename(oldpath,newpath,erro => { 
    if (erro) throw erro
  }) 

  
  var d =  new Date().toISOString().substring(0,16)
  var files = jsonfile.readFileSync('./dbFiles.json')
  files.push({
    date:d,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })

  jsonfile.writeFileSync('./dbFiles.json', files)
  res.redirect('/')
  
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  res.write('<pre>' + JSON.stringify(req.body) + '</pre>' )
  res.write('<pre>' + JSON.stringify(req.file) + '</pre>' )
  res.end()

});




module.exports = app;
