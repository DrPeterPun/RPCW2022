var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer')
var axios = require('axios')
var bodyParser = require('body-parser')
//var indexRouter = require('./routes/index');
var upload = multer({dest:'fileStore'})
var app = express();
const json_path = 'http://localhost:3000/'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);


app.get('/', function(req, res) {
  //axios get ara ter a info toda
  axios.get(json_path + 'files').then( result => {
    console.log("files na db :" + result.data) 
    // FAZER A VIEW
    res.render('index', { title: 'FileDB', files : result.data});
  })
});

app.post('/insert', upload.single('ficheiro'), function(req,res) {
  // pega nos dados e insere no json, redirect para a main page
 
  console.log("file obj: " + req.file)
  var d =  new Date().toISOString().substring(0,16)
  let oldpath = __dirname + '/' + req.file.path
  let newpath = __dirname + '/fileStore/' + req.file.path

  body = {
    date: d,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    desc: req.body.text
  }
  console.log(body)
 
  fs.rename(oldpath,newpath,erro => { 
    if (erro) throw erro
    else console.log("Moved File")
  }) 
  // post para o json server com o body
  axios.post(json_path + 'files/',body).then(response => {
    //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    //res.end()
    res.redirect('/')
  });
});

app.get('/delete/:name', function(req,res) {
  //get req para saber qual o id dessa entrada
  axios.get(json_path + 'files/?name='+req.params.name).then( getres => {
    axios.delete(json_path + `files/${getres.data[0].id}`).then( r => {
      res.redirect('/')
    })
  })
})

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
  next()
});


module.exports = app;
