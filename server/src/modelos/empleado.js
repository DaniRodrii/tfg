const mongoose = require('mongoose');

const DatosEmpleado = mongoose.Schema({
    nom_emp: {
        type: String,
        require: true
    },

    sexo: {
        type: String,
        require: true
    },

    edad: {
        type: Number,
        require: true
    },

    cargo: {
        type: String,
        require: true
    },

    nom_rest: {
        type: String,
        require: true
    },

    DNI: {
        type: String,
        require: true
    },

    contrasena: {
        type: String,
        require: true
    }
});