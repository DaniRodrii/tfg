const mongoose = require('mongoose');

const DatosRestaurante = mongoose.Schema({
    nom_rest: {
        type: String,
        required: true
    },

    nom_dueno: {
        type: String,
        required: true
    },

    telefono: {
        type: Number,
        required: true
    },

    mesas: {
        type: String,
        required: true
    },

    id_user: {
        type: String,
        required: true
    },

    direccion: {
        type: String,
        required: true
    }
});
