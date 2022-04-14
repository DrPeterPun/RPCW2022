var Clav = require('../models/clav')

// <<<Exercício 4>>>

// 1.
module.exports.listar = function(){
    return Casamento
            // projeção
            // não mencionamos o campo _id, já que este é sempre projetado por omissão
            .find({}, {date:1, title:1})
            .exec()
}

// 2.
module.exports.consultar = function(id){
    return Casamento
            // select é especificado no primeiro objeto
            .findOne({_id: id})
            .exec()
}

// 3.
module.exports.listarPorNome = function(n){
    var nome = new RegExp(n, 'i')
    return Casamento
            .find({title: nome})
            .exec()
}

// 4.
module.exports.listarPorAno = function(a){
    var ano = new RegExp(a)
    return Casamento
            .find({date: ano})
            .exec()
}