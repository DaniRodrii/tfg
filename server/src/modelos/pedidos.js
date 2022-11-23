const mongoose = require('mongoose');

const DatosPedidos = mongoose.Schema({
    nom_rest: {
        type: String,
        require: true
    },

    titulo: {
        type: String,
        require: true
    },

    descripcion: {
        type: String,
        require: true
    },

    precio: {
        type: Number,
        require: true
    },

    direccion: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Pedidos', DatosPedidos);
