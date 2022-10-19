const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const rutasUsuario = require('./rutas/usuarios');

const app =express();
const port= process.env.PORT || 9000;

//gestión de rutas
app.use(express.json());
app.use('/api', rutasUsuario);


//rutas
app.get('/', (req, res) => {
    res.send('Bienvenido');
});

mongoose.connect(process.env.mongodb_atlas_uri)
    .then(() => console.log('Conectado a Mongodb atlas'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('ok', port));