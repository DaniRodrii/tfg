const express = require('express');
const rutasUsuario = require('./rutas/usuarios');
const app =express();

const port= process.env.PORT || 4200;

app.set('port', port);

//gestión de rutas
app.use(express.json());
app.use('/api/usuarios', rutasUsuario);


//rutas
app.get('/', (req, res) => {
    res.send('Bienvenido');
});

module.exports = app;