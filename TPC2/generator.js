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

const as = './htmls/atores/'
if(!fs.existsSync(as)){
    fs.mkdirSync(as)
}

function urlFiler(word) {
    return word.replace(/\s|\W/g,"")
}

var actorDict = {}

// creates the html href when given an actor
function actorHref(actor) {
    return ("<a href=\"http::localhost:"+port+"/actor/"+urlFiler(actor)+"\"> " +actor + " <a/>")
}

// creates the html href when given a movie 
function movieHref(movie) {
    return ("<a href=\"http::localhost:"+port+"/filme/"+urlFiler(movie)+"\"> " +movie + " <a/>")
}

function addKey(actor,movie) {
    if (! (actor in actorDict) ) {
        actorDict[actor] = []
    }
    actorDict[actor].push(movie)
}

fs.readFile('cinemaATP.json', function (err, data) {
    var movies = JSON.parse(data)
    movies.forEach(movie => {
        var title = movie["title"]
        // title without spaces for easier use
        var titlefile = urlFiler(title)
        
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
        
        actors.forEach(a => {
            console.log(a+"::" + title)
            addKey(a,title)
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
        
        //fs.writeFile(ms+titlefile+".html",newhtml, (err) => {
        //    if (err) {
        //       console.log(err)
        //       throw err 
        //    }
        //    //console.log("file:" + titlefile + " has been created")
        //})
        //console.log("----------------\n")
        //console.log(newhtml)
    });

    var actorSample = fs.readFileSync("actorSample.html").toString()
    for (const actor in actorDict) {
       
        var movString = ""
        actorDict[actor].forEach( mov =>{
            movString+="\t\t\t<li>" + movieHref(mov) + "</li>\n"
        })

        var actorhtml = actorSample.replace(/<!--ACTOR-->/g,actor)
        actorhtml = actorhtml.replace(/<!--MOVIES-->/g,movString)
        
        fs.writeFile(as+urlFiler(actor)+".html",actorhtml, (err) => {
        if (err) {
            console.log(err)
            throw err 
        }
        console.log("file:" + as+urlFiler(actor) + " has been created")
    })
    }
    
    
    
})


