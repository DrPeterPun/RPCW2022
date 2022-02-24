const fs = require('fs')
const url = require('url')
const http = require('http')
const port = 12345

var movieSample = fs.readFileSync("movieSample.html").toString()
const directory = './htmls'
if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
}

const ms = './htmls/filmes/'
if(!fs.existsSync(ms)){
    fs.mkdirSync(ms)
}

function actorHref(actor) {
    return ("<a href=\"http::localhost:"+port+"/actor/"+actor+"\"> " +actor + " <a/>")
}


fs.readFile('cinemaATP.json', function (err, data) {
    var movies = JSON.parse(data)
    movies.forEach(movie => {
        var title = movie["title"]
        // title without spaces for easier use
        var titlefile = title.replace(/\s|\W/g,"")
        
        var actors = movie["cast"]
        var actorString = ""
        actors.forEach( act =>{
            actorString+="\t\t\t<li>" + actorHref(act) + "</li>\n"
        })

        var genres = movie["genres"]
        var genresString = ""
        genres.forEach( gen =>{
            genresString+="\t\t\t<li>" + gen + "</li>\n"
        })

        var year = movie["year"]

        var newhtml = movieSample.replace(/<!--MOVIE TITLE-->/g,title)
        //console.log(newhtml)
        newhtml = newhtml.replace(/<!--ACTORS-->/g,actorString)
        //console.log(newhtml)
        newhtml = newhtml.replace(/<!--GENRES-->/g,genresString)
        //console.log(newhtml)
        newhtml = newhtml.replace(/<!--YEAR-->/g,"\t\t\t" + year)
        //console.log(newhtml)
        fs.writeFile(ms+titlefile+".html",newhtml, (err) => {
            if (err) {
               console.log(err)
               throw err 
            }
            console.log("file:" + titlefile + " has been created")
        })
        console.log("----------------\n")
        console.log(newhtml)
    });
})

