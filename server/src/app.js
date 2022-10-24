const express = require('express');
const rutasUsuario = require('./rutas/usuarios');
const app =express();
const cors = require('cors');

const port= process.env.PORT || 4000;

app.set('port', port);

//gestión de rutas
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', rutasUsuario);

 
//rutas
app.get('/', (req, res) => {
    res.send('Bienvenido');
});

module.exports = app;