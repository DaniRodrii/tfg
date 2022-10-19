const mongoose = require('mongoose');

const DatosEmpleado = mongoose.Schema({
    nom_emp: {
        type: String,
        required: true
    },

    sexo: {
        type: String,
        required: true
    },

    edad: {
        type: Number,
        required: true
    },

    cargo: {
        type: String,
        required: true
    },

    nom_rest: {
        type: String,
        required: true
    },

    DNI: {
        type: String,
        required: true
    },

    contrasena: {
        type: String,
        required: true
    }
});