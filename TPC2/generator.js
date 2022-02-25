const fs = require('fs')
const url = require('url')
const http = require('http')
const { deepStrictEqual } = require('assert')
const port = 12345

console.log("TESTE 123123")


var actorSample = fs.readFileSync("actorSample.html").toString()
var movieSample = fs.readFileSync("movieSample.html").toString()
var indexSample = fs.readFileSync("indexSample.html").toString()
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

const movieindex = './movieIndex.html'
const actorindex = './actorIndex.html'

function urlFiler(word) {
    return word.replace(/\s|\W/g,"")
}

var actorDict = {}

// creates the html href when given an actor
function actorHref(actor) {
    return ("<a href=\"http://localhost:"+port+"/atores/"+urlFiler(actor)+"\"> " +actor + " <a/>")
}

// creates the html href when given a movie 
function movieHref(movie) {
    return ("<a href=\"http://localhost:"+port+"/filmes/"+urlFiler(movie)+"\"> " +movie + " <a/>")
}

function addKey(actor,movie) {
    if (! (actor in actorDict) ) {
        actorDict[actor] = []
    }
    actorDict[actor].push(movie)
}


fs.readFile('cinemaATP.json', function (err, data) {
    var movies = JSON.parse(data)

    //iterates through movies, creates the movie files.html files, created the actors dictionary
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
            //console.log(a+"::" + title)
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
        
        fs.writeFile(ms+titlefile+".html",newhtml, (err) => {
            if (err) {
               console.log(err)
               throw err 
            }
            //console.log("file:" + titlefile + " has been created")
        })
        //console.log("----------------\n")
        //console.log(newhtml)
        
    });//movies.forEach(movie => 


    //creates the actor.html pages
    for (const actor in actorDict) {
       
        var movString = ""
        actorDict[actor].forEach( mov =>{
            movString+="\t\t\t<li>" + movieHref(mov) + "</li>\n"
        })

        var actorhtml = actorSample.replace(/<!--ACTOR-->/g,actor)
        actorhtml = actorhtml.replace(/<!--MOVIES-->/g,movString)
        
        fs.writeFile(as+urlFiler(urlFiler(actor))+".html",actorhtml, (err) => {
        if (err) {
            console.log(err)
            throw err 
        }
        //console.log("file:" + as+urlFiler(actor) + " has been created")
        })
    }
    

    //write the actor index to .html
    var actorIndex = indexSample.replace(/<!--TITLE-->/g,"Atores")
    var actIndS = ""
    Object.keys(actorDict).forEach( actor => {
        actIndS+="\t\t\t<li>" + actorHref(actor) + "</li>\n"
        //console.log(actor)
    })
    
    //console.log(actorDict)
    
    actorIndex = actorIndex.replace(/<!--ELEMENT-->/g,actIndS)
    fs.writeFile(actorindex,actorIndex, (err) => {
        if (err) {
            console.log(err)
        throw err 
        }
        //console.log("file:" + titlefile + " has been created")
    })

    
    //write the movie indext to .html
    var movieIndex = indexSample.replace(/<!--TITLE-->/g,"Filmes")
    var movIndS = ""
    movies.forEach( movie => {
        movIndS+="\t\t\t<li>" + movieHref(movie["title"]) + "</li>\n"
    })
    movieIndex = movieIndex.replace(/<!--ELEMENT-->/g,movIndS)
    fs.writeFile(movieindex,movieIndex, (err) => {
        if (err) {
           console.log(err)
               throw err 
        }
        //console.log("file:" + titlefile + " has been created")
    })

})