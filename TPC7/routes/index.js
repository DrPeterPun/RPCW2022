var express = require('express');
var router = express.Router();
var axios = require('axios');
const { response } = require('../app');
//const token = gettoken();
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ"

/* GET home page. */
router.get('/', function(req, res, next) {
  classe = axios.get("http://clav-api.di.uminho.pt/v2/classes" , {params : { nivel:1, apikey: token}}).then(response => {
    console.log(response.data)
    res.render('main', { title: 'Express', classes: response.data})
  })
});

router.get('/classes/:id', function(req, res, next) {
  console.log("classe :")
  console.log(req.params.id)
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id, {params : { apikey: token, }}).then(response => {

    const titulo = response.data.titulo
    const codigo = response.data.codigo
    const id = response.data.id
    const status = response.data.status
    const nivel = response.data.nivel
    const filhos = response.data.filhos
    const desc = response.data.descricao
    const notasAp = response.data.notasAp
    const notasEx = response.data.notasEx
    //console.log(titulo + " " + codigo + " " +id + " " +status + " " +nivel)
    //console.log(filhos)
    console.log(notasAp)
    console.log(notasEx)
    
    //console.log("classe inteira")
    //console.log(response.data)
    
    //console.log(desc)
    n = (codigo.lastIndexOf('.'))
    prev = codigo.substring(0,n)

    res.render('classe', { title: titulo, codigo:codigo, id: id, status:status, nivel:nivel, filhos:filhos, notasAp: notasAp, notasEx: notasEx, desc: desc, prev:prev})
     
  })
});



module.exports = router;
