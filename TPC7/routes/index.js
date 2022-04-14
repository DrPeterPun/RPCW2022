var express = require('express');
var router = express.Router();
var axios = require('axios');
const { response } = require('../app');
//const token = gettoken();
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ"

/* GET home page. */
router.get('/', function(req, res, next) {
  classe = axios.get("http://clav-api.di.uminho.pt/v2/classes" , {params : { nivel:2, apikey: token}}).then(response => {
    console.log(response.data)
    res.render('main', { title: 'Express', classes: response.data})
  })
});

router.get('/classes/:id', function(req, res, next) {
  console.log(req.params.id)
  Promise.all([
    // informacao base da classe
    axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id, {params : { apikey: token}}),
    axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.id+"/descendencia", {params : { apikey: token}})
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      console.log(response)
      return response
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log("classes\n");
    console.log(data[0].data);
    console.log("descendencia \n" );
    console.log(data[1].data);
  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });
  res.end()
});



module.exports = router;
