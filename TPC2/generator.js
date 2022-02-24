const fs = require('fs')
const url = require('url')

var sample = fs.readFileSync("sample.html").toString()
const directory = './htmls'
if(!fs.existsSync(directory)){
    fs.mkdirSync(directory)
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
            actorString+="\t\t\t<il>" +act + "</il>\n\t\t\t"
        })

        var genres = movie["genres"]
        var genresString = ""
        genres.forEach( gen =>{
            genresString+="\t\t\t<il>" + gen + "</il>\n"
        })

        var year = movie["year"]

        var newhtml = sample .replace(/<!--MOVIE TITLE-->/g,title)
        //console.log(newhtml)
        newhtml = newhtml.replace(/<!--ACTORS-->/g,actorString)
        //console.log(newhtml)
        newhtml = newhtml.replace(/<!--GENRES-->/g,genresString)
        //console.log(newhtml)
        newhtml = newhtml.replace(/<!--YEAR-->/g,"\t\t\t" + year)
        //console.log(newhtml)
        fs.writeFile("./htmls/"+titlefile,newhtml, (err) => {
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