const axios = require('axios')

axios.delete('http://localhost:3000/pubs/DAW2020')
    .then(resp =>
        console.log(resp.data))
    .catch(error => {
        console.log('Error: ' + error);
    });