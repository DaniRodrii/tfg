const mongoose = require('mongoose');

const DatosUsuario = mongoose.Schema({
    nom_compl: {
        type: String,
        required: true
    },

    nom_user: {
        type: String,
        required: true,
        unique: true
    },

    edad: {
        type: Number,
        required: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },

    contrasena: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', DatosUsuario);