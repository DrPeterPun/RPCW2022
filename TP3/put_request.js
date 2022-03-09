const axios = require('axios')

axios.put('http://localhost:3000/pubs/DAW2020', {
        "id" : "DAW2020",
        "title": "Aula5",
        "year" : "2020",
        "authors": [
            "Alexandra Lourenco",
            "Jose Carlos Ramalho"
        ]
    }).then(resp =>
        console.log(resp.data))
    .catch(error => {
        console.log('Error: ' + error);
    });