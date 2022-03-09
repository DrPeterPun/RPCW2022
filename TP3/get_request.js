const axios = require('axios')

axios.get('http://localhost:3000/pubs')
    .then(resp => {
        pubs = resp.data;
        pubs.forEach(a => {
            console.log(`${a.year}, ${a.id}, ${a.title}`);
        });
    })
    .catch(error => {
        console.log(error);
    });