const mongoose = require('mongoose');

const DatosRestaurante = mongoose.Schema({
    nom_rest: {
        type: String,
        require: true
    },

    nom_dueno: {
        type: String,
        require: true
    },

    telefono: {
        type: Number,
        require: true
    },

    mesas: {
        type: String,
        require: true
    },

    id_user: {
        type: String,
        require: true
    },

    direccion: {
        type: String,
        require: true
    }
});
