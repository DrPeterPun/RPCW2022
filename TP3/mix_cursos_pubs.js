const axios = require('axios')

axios.get('http://localhost:3001/cursos')
    .then(resp => {
        cursos = resp.data;
        cursos.forEach(a => {
        axios.post('http://localhost:3000/pubs', {
            "id" : a.id,
            "title": a.designacao
        }).then(resp =>
            console.log(resp.data))
        .catch(error => {
            console.log('Error: ' + error);
        });
        });
    })
    .catch(error => {
        console.log(error);
    });