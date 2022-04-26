const mongoose = require('mongoose')

var casamentoSchema = new mongoose.Schema({
    _id: String,
    date: String, 
    title: String,
    href: String
})

// exportar o modelo
module.exports = mongoose.model('casamento', casamentoSchema)